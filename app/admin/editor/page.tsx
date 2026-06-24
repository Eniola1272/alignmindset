import { Edit3 } from "lucide-react";
import { AdminEditor } from "@/components/admin-editor";
import { getAdminDashboardData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

type EditorPageProps = {
  searchParams: Promise<{
    edit?: string;
  }>;
};

export default async function AdminEditorPage({ searchParams }: EditorPageProps) {
  const params = await searchParams;
  const dashboard = await getAdminDashboardData();
  const selectedPost =
    dashboard.posts.find((post) => post.slug === params.edit) ?? undefined;
  const editingPost =
    dashboard.posts.find((post) => post.slug === params.edit) ??
    dashboard.posts.at(0);

  return (
    <section className="adminPanel editorPanel">
      <div className="panelHeader">
        <div>
          <span>Editor</span>
          <h2>{selectedPost ? `Editing ${selectedPost.title}` : "New article"}</h2>
        </div>
        <Edit3 size={24} aria-hidden="true" />
      </div>
      <AdminEditor key={selectedPost?.id ?? "new"} post={selectedPost} />
      {!selectedPost && editingPost ? (
        <p className="emptyState">
          Select a post from the posts page to edit, or start a new article here.
        </p>
      ) : null}
    </section>
  );
}
