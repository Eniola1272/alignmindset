const flutterwaveSecretKey =
  process.env.FLUTTERWAVE_SECRET_KEY ?? process.env.FLW_SECRET_KEY;

type FlutterwaveCustomer = {
  name: string;
  email: string;
  phonenumber?: string;
};

type InitializePaymentInput = {
  txRef: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  customer: FlutterwaveCustomer;
  title: string;
  description: string;
  meta?: Record<string, string | number | boolean>;
};

type FlutterwaveInitializeResponse = {
  status?: string;
  message?: string;
  data?: {
    link?: string;
  };
};

type FlutterwaveVerifyResponse = {
  status?: string;
  message?: string;
  data?: {
    id?: number;
    tx_ref?: string;
    amount?: number;
    currency?: string;
    status?: string;
    customer?: {
      email?: string;
      name?: string;
      phone_number?: string;
    };
  };
};

export function hasFlutterwaveConfig() {
  return Boolean(flutterwaveSecretKey);
}

export async function initializeFlutterwavePayment({
  txRef,
  amount,
  currency,
  redirectUrl,
  customer,
  title,
  description,
  meta
}: InitializePaymentInput) {
  if (!flutterwaveSecretKey) {
    return {
      ok: false,
      message: "Flutterwave is not configured yet.",
      link: null
    };
  }

  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${flutterwaveSecretKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency,
      redirect_url: redirectUrl,
      customer,
      customizations: {
        title,
        description
      },
      meta
    })
  });

  const payload = (await response.json()) as FlutterwaveInitializeResponse;

  if (!response.ok || payload.status !== "success" || !payload.data?.link) {
    return {
      ok: false,
      message: payload.message ?? "Flutterwave could not start checkout.",
      link: null
    };
  }

  return {
    ok: true,
    message: "Checkout created.",
    link: payload.data.link
  };
}

export async function verifyFlutterwaveTransaction(transactionId: string) {
  if (!flutterwaveSecretKey) {
    return {
      ok: false,
      message: "Flutterwave is not configured yet.",
      data: null
    };
  }

  const response = await fetch(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${flutterwaveSecretKey}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    }
  );

  const payload = (await response.json()) as FlutterwaveVerifyResponse;

  if (!response.ok || payload.status !== "success" || !payload.data) {
    return {
      ok: false,
      message: payload.message ?? "Payment verification failed.",
      data: null
    };
  }

  return {
    ok: true,
    message: payload.message ?? "Payment verified.",
    data: payload.data
  };
}
