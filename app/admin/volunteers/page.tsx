import Link from "next/link";
import { Download, HandHeart } from "lucide-react";
import { PendingSubmitButton } from "@/components/pending-submit-button";
import { getAdminDashboardData } from "@/lib/admin-data";
import { updateVolunteerStatus } from "@/lib/actions";

export const dynamic = "force-dynamic";

const volunteerStatuses = ["new", "contacted", "approved", "declined"] as const;

type VolunteersPageProps = {
  searchParams: Promise<{
    volunteerUpdated?: string;
    volunteerError?: string;
  }>;
};

export default async function AdminVolunteersPage({
  searchParams
}: VolunteersPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();

  return (
    <>
      {params.volunteerUpdated ? (
        <p className="adminNotice success">Volunteer status updated.</p>
      ) : null}
      {params.volunteerError ? (
        <p className="adminNotice">
          Volunteer status could not be updated. Please try again.
        </p>
      ) : null}

      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Volunteers</span>
            <h2>Applications and follow-up status</h2>
          </div>
          <div className="panelActions">
            <Link className="secondaryButton" href="/admin/volunteers/export">
              <Download size={17} aria-hidden="true" />
              Export CSV
            </Link>
            <HandHeart size={24} aria-hidden="true" />
          </div>
        </div>
        <div className="adminTableWrap containedTableWrap">
          <table className="adminTable volunteerAdminTable">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Contact</th>
                <th>Skills and motivation</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>
                    <strong>{volunteer.name}</strong>
                    <small>{volunteer.email}</small>
                  </td>
                  <td>
                    <strong>{volunteer.phone}</strong>
                    <small>{volunteer.email}</small>
                  </td>
                  <td>
                    <details className="tableDetails">
                      <summary>{volunteer.skills}</summary>
                      <p>{volunteer.motivation}</p>
                      <p>{volunteer.valueAdd}</p>
                    </details>
                  </td>
                  <td>
                    <span className={`statusPill status-${volunteer.status}`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td>{new Date(volunteer.createdAt).toLocaleDateString()}</td>
                  <td>
                    <form className="statusForm" action={updateVolunteerStatus}>
                      <input name="id" type="hidden" value={volunteer.id} />
                      <select name="status" defaultValue={volunteer.status}>
                        {volunteerStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <PendingSubmitButton icon="save" pendingLabel="Saving">
                        Save
                      </PendingSubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!dashboard.volunteers.length ? (
            <p className="emptyState tableEmpty">No volunteer applications yet.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
