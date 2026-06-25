import Link from "next/link";
import { Edit3, Eye, FileText } from "lucide-react";
import { PendingSubmitButton } from "@/components/pending-submit-button";
import { getAdminDashboardData } from "@/lib/admin-data";
import { deletePost } from "@/lib/actions";

export const dynamic = "force-dynamic";

type PostsPageProps = {
  searchParams: Promise<{
    deleted?: string;
  }>;
};

export default async function AdminPostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();

  return (
    <>
      {params.deleted ? (
        <p className="adminNotice success">Post deleted.</p>
      ) : null}

      <section className="adminPanel">
        <div className="panelHeader">
          <div>
            <span>Posts</span>
            <h2>Manage articles</h2>
          </div>
          <FileText size={24} aria-hidden="true" />
        </div>
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                    <small>{post.slug}</small>
                  </td>
                  <td>
                    <span className={`statusPill status-${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>{post.categoryLabel || post.category}</td>
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="tableActions">
                      <Link href={`/admin/editor?edit=${post.slug}`}>
                        <Edit3 size={16} aria-hidden="true" />
                        Edit
                      </Link>
                      <Link href={`/blog/preview/${post.slug}`}>
                        <Eye size={16} aria-hidden="true" />
                        Preview
                      </Link>
                      <form action={deletePost}>
                        <input name="id" type="hidden" value={post.id} />
                        <input name="slug" type="hidden" value={post.slug} />
                        <PendingSubmitButton
                          icon="delete"
                          pendingLabel="Deleting"
                        >
                          Delete
                        </PendingSubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!dashboard.posts.length ? (
            <p className="emptyState tableEmpty">No posts yet.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
