import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import EditProfileButton from "./shared/edit-profile-button";

const ProfileHeader = () => {
    return (
        <>
            <div className={"flex items-center w-full justify-between"}>
                <div className={"flex items-center gap-4"}>
                    <div>
                        <Avatar className="hidden h-20 w-20 sm:flex">
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback className="text-2xl">GM</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className={"text-xl font-semibold"}>Gabriel Meira</h1>
                            <div className="flex gap-1">
                                <Badge variant={"outline"}>HTML</Badge>
                                <Badge variant={"outline"}>CSS</Badge>
                                <Badge variant={"outline"}>Javascript</Badge>
                            </div>
                        </div>
                        <p className={"text-muted-foreground"}>@gabrielmeira</p>
                    </div>
                </div>
                <div>
           
                    <EditProfileButton />

                </div>
            </div>
            <div className="mt-6 mb-8">
                <p className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, aspernatur.</p>
            </div>
      </>
    );
}

export default ProfileHeader;