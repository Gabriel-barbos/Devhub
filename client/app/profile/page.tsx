import ProfileHeader from "@/components/profile-page/profile-header";
import ProfilePosts from "@/components/profile-page/profile-posts";
import ProfileTabs from "@/components/profile-page/profile-tabs";

export default function Page() {
  return (
    <div>
      <ProfileHeader></ProfileHeader>
      <ProfileTabs />
      <ProfilePosts />
    </div>
  );
}
