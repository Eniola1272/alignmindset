import Link from "next/link";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Eye,
  Filter,
  Hourglass,
  Layers,
  Search,
  Settings,
  Sparkles,
  User
} from "lucide-react";
import {
  getAdminAnalyticsSummary,
  getAdminSubmissionsList,
  getBuilderSettings
} from "@/lib/progress-builder/db";

type AdminPageProps = {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
};

export default async function AdminProgressAssessmentsPage({ searchParams }: AdminPageProps) {
  const { status, search } = await searchParams;
  const submissions = await getAdminSubmissionsList({ status, search });
  const analytics = await getAdminAnalyticsSummary();
  const settings = await getBuilderSettings();

  return (
    <div className="adminSubmissionsPage">
      {/* Analytics Overview Cards */}
      <section className="adminStatsSection">
        <div className="adminStatCard">
          <div className="adminStatIconWrap isBlue">
            <Compass size={22} aria-hidden="true" />
          </div>
          <div className="adminStatContent">
            <span className="adminStatLabel">Total Started</span>
            <span className="adminStatValue">{analytics.totalStarted}</span>
          </div>
        </div>

        <div className="adminStatCard">
          <div className="adminStatIconWrap isGreen">
            <CheckCircle2 size={22} aria-hidden="true" />
          </div>
          <div className="adminStatContent">
            <span className="adminStatLabel">Submitted</span>
            <span className="adminStatValue">{analytics.totalSubmitted}</span>
            <span className="adminStatSubtext">{analytics.completionRate}% completion rate</span>
          </div>
        </div>

        <div className="adminStatCard">
          <div className="adminStatIconWrap isGold">
            <Hourglass size={22} aria-hidden="true" />
          </div>
          <div className="adminStatContent">
            <span className="adminStatLabel">Awaiting Review</span>
            <span className="adminStatValue">{analytics.awaitingReviewCount}</span>
            <span className="adminStatSubtext">Needs team release</span>
          </div>
        </div>

        <div className="adminStatCard">
          <div className="adminStatIconWrap isLavender">
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div className="adminStatContent">
            <span className="adminStatLabel">Plans Released</span>
            <span className="adminStatValue">{analytics.totalPlansReleased}</span>
          </div>
        </div>
      </section>

      {/* Review Workflow Mode Banner */}
      <div className="adminSettingsNotice">
        <div className="adminSettingsNoticeLeft">
          <Settings size={18} aria-hidden="true" />
          <span>
            <strong>Release Mode:</strong>{" "}
            {settings.require_human_review
              ? "Mandatory Human Review (Plans remain private until an admin clicks Release)"
              : "Auto-Release (Plans become visible to participants immediately after AI generation)"}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="adminFilterBar">
        <form className="adminSearchForm" method="GET">
          <div className="adminSearchInputWrap">
            <Search size={16} aria-hidden="true" />
            <input
              name="search"
              type="search"
              placeholder="Search by participant name or email..."
              defaultValue={search || ""}
            />
          </div>

          <div className="adminSelectWrap">
            <Filter size={16} aria-hidden="true" />
            <select name="status" defaultValue={status || "all"}>
              <option value="all">All Statuses</option>
              <option value="needs_review">Needs Review</option>
              <option value="completed">Completed / Released</option>
              <option value="submitted">Submitted</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <button type="submit" className="primaryButton adminFilterBtn">
            Apply Filters
          </button>
        </form>
      </div>

      {/* Submissions Table */}
      <div className="adminTableCard">
        {submissions.length === 0 ? (
          <div className="adminEmptyState">
            <Compass size={32} className="adminEmptyIcon" aria-hidden="true" />
            <h3>No submissions found</h3>
            <p>Try adjusting your search keywords or status filter.</p>
          </div>
        ) : (
          <table className="adminDataTable">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Target Skill</th>
                <th>Status</th>
                <th>Completion</th>
                <th>Submitted / Saved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => {
                const statusBadgeClass =
                  item.status === "completed"
                    ? "isCompleted"
                    : item.status === "needs_review"
                      ? "isReview"
                      : item.status === "submitted"
                        ? "isSubmitted"
                        : "isDraft";

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="adminParticipantCell">
                        <strong>{item.participant_name || "Anonymous Participant"}</strong>
                        <span>{item.email || "No email entered"}</span>
                      </div>
                    </td>

                    <td>
                      <span className="adminSkillCell">{item.target_skill || "General Track"}</span>
                    </td>

                    <td>
                      <span className={`adminStatusBadge ${statusBadgeClass}`}>
                        {item.status.replace(/_/g, " ")}
                      </span>
                    </td>

                    <td>
                      <div className="adminCompletionWrap">
                        <div className="adminMiniTrack">
                          <div
                            className="adminMiniFill"
                            style={{ width: `${item.completion_percentage}%` }}
                          />
                        </div>
                        <span>{item.completion_percentage}%</span>
                      </div>
                    </td>

                    <td>
                      <span className="adminDateCell">
                        {new Date(item.submitted_at || item.last_saved_at).toLocaleDateString()}
                      </span>
                    </td>

                    <td>
                      <Link
                        href={`/admin/progress-assessments/${item.id}`}
                        className="secondaryButton adminRowBtn"
                      >
                        <Eye size={14} aria-hidden="true" />
                        View & Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
