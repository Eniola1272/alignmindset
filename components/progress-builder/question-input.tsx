"use client";

import type { QuestionDefinition } from "@/lib/progress-builder/types";

type QuestionInputProps = {
  question: QuestionDefinition;
  value: any;
  error?: string;
  onChange: (val: any) => void;
};

export function QuestionInput({
  question,
  value,
  error,
  onChange
}: QuestionInputProps) {
  const { question_id, label, helper_text, input_type, options, required, placeholder } = question;

  return (
    <div className={`pbQuestionCard ${error ? "hasError" : ""}`} id={`q-card-${question_id}`}>
      <label htmlFor={`input-${question_id}`} className="pbQuestionLabel">
        <span>{label}</span>
        {required ? <span className="pbRequiredMark" aria-label="Required">*</span> : null}
      </label>

      {helper_text ? (
        <p className="pbQuestionHelper" id={`desc-${question_id}`}>
          {helper_text}
        </p>
      ) : null}

      <div className="pbQuestionInputWrapper">
        {input_type === "text" || input_type === "url" || input_type === "number" ? (
          <input
            id={`input-${question_id}`}
            type={input_type === "number" ? "number" : input_type === "url" ? "url" : "text"}
            className="pbTextInput"
            value={value ?? ""}
            placeholder={placeholder}
            aria-describedby={helper_text ? `desc-${question_id}` : undefined}
            onChange={(e) =>
              onChange(input_type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)
            }
          />
        ) : null}

        {input_type === "textarea" ? (
          <textarea
            id={`input-${question_id}`}
            className="pbTextareaInput"
            rows={4}
            value={value ?? ""}
            placeholder={placeholder}
            aria-describedby={helper_text ? `desc-${question_id}` : undefined}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : null}

        {input_type === "yes_no" ? (
          <div className="pbYesNoGroup" role="radiogroup" aria-labelledby={`input-${question_id}`}>
            <button
              type="button"
              className={`pbSegmentBtn ${value === true ? "isSelected" : ""}`}
              onClick={() => onChange(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`pbSegmentBtn ${value === false ? "isSelected" : ""}`}
              onClick={() => onChange(false)}
            >
              No
            </button>
          </div>
        ) : null}

        {input_type === "rating_scale" ? (
          <div className="pbRatingScale" role="radiogroup" aria-label={label}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
              const selected = value === score;
              return (
                <button
                  key={score}
                  type="button"
                  className={`pbRatingBtn ${selected ? "isSelected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => onChange(score)}
                >
                  {score}
                </button>
              );
            })}
          </div>
        ) : null}

        {input_type === "single_choice" && options ? (
          <div className="pbChoiceGroup" role="radiogroup" aria-label={label}>
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`pbChoiceCard ${isSelected ? "isSelected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`radio-${question_id}`}
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => onChange(opt.value)}
                    className="pbRadioHidden"
                  />
                  <div className="pbChoiceRadioIndicator" />
                  <div className="pbChoiceText">
                    <span className="pbChoiceLabel">{opt.label}</span>
                    {opt.description ? (
                      <span className="pbChoiceDesc">{opt.description}</span>
                    ) : null}
                  </div>
                </label>
              );
            })}
          </div>
        ) : null}

        {input_type === "multiple_choice" && options ? (
          <div className="pbChoiceGroup" role="group" aria-label={label}>
            {options.map((opt) => {
              const currentList = Array.isArray(value) ? value : [];
              const isSelected = currentList.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`pbChoiceCard ${isSelected ? "isSelected" : ""}`}
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        onChange(currentList.filter((item: string) => item !== opt.value));
                      } else {
                        onChange([...currentList, opt.value]);
                      }
                    }}
                    className="pbCheckboxHidden"
                  />
                  <div className="pbChoiceCheckIndicator" />
                  <div className="pbChoiceText">
                    <span className="pbChoiceLabel">{opt.label}</span>
                    {opt.description ? (
                      <span className="pbChoiceDesc">{opt.description}</span>
                    ) : null}
                  </div>
                </label>
              );
            })}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="pbErrorText" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
