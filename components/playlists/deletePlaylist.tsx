'use client'

import playlist from '@/types/playlist';
import { MouseEvent, useState } from "react";
import { Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';

import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import LoadingButton from "@/components/loadingButton";
import { deletePlaylist } from "@/actions/deletePlaylist";
import PlexImage from "@/components/plexImage";

function DeletePlaylist({playlist }: { playlist: playlist }) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState<string>('');

    const handleOpen = (open: boolean) => {
        if (!open) {
            setTimeout(() => {
                setConfirmation('');
                setOpen(false);
            }, 100);
        }
    };

    const preventDefault = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const initialize = (e: MouseEvent) => {
        preventDefault(e);
        setOpen(true);
    }

    const shouldDelete = (): boolean => {
        return confirmation !== playlist.title;
    }

    const deletePlaylistHandler = async () => {
        setLoading(true);
        await deletePlaylist(playlist.ratingKey);
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <div onClick={preventDefault}>
                <Trash2 color={'white'} className={'size-6'} onClick={(e) => initialize(e)} />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Playlist</DialogTitle>
                        <DialogDescription>Are you sure you want to permanently delete this playlist?</DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col gap-4'}>
                        <Card className={'overflow-hidden flex gap-4'}>
                            <CardHeader className={'relative h-[100px] aspect-square'}>
                                <PlexImage src={playlist.thumb ? playlist.thumb : playlist.composite} alt={playlist.title} fill />
                            </CardHeader>
                            <CardContent className={'flex flex-col p-0 gap-4 justify-center'}>
                                <CardTitle>Name: {playlist.title}</CardTitle>
                                {playlist.summary && (
                                    <CardDescription>Summary: {playlist.summary.substring(0, 25)}{playlist.summary.length > 25 ? '...' : ''}</CardDescription>
                                )}
                            </CardContent>
                        </Card>
                        <div>
                            <Label htmlFor={'confirmation'}>Type &lsquo;{playlist.title}&lsquo; to confirm</Label>
                            <Input id={'confirmation'} placeholder={'Retype playlist title to confirm'} onChange={(e) => setConfirmation(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <div className={'md:w-[150px]'}>
                            <LoadingButton loading={loading} type={'button'} disabled={loading || shouldDelete()} onClick={deletePlaylistHandler}>Delete</LoadingButton>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default DeletePlaylist
