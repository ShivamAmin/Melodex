'use client'

import { useState, MouseEvent } from "react";
import { SquarePen } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";

import { EditPlaylistDialog } from "@/components/playlists/editPlaylistDialog";

export const EditPlaylist = ({ ratingKey, title, description }: { ratingKey: string, title: string, description?: string, callback?: () => void }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = (open: boolean) => {
        if (!open) {
            setOpen(false);
        }
    }

    const preventDefault = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const initialize = async () => {
        setOpen(true);
    }

    return (
        <Dialog open={open} onOpenChange={(open: boolean) => handleOpen(open)}>
            <div onClick={preventDefault}>
                <SquarePen color={'white'} className={'size-6'} onClick={() => initialize()} />
                <EditPlaylistDialog ratingKey={ratingKey} title={title} description={description} setOpen={(b) => setOpen(b)} />
            </div>
        </Dialog>
    )
}

export default EditPlaylist
