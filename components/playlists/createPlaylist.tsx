'use client'

import {useState} from "react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import LoadingButton from "@/components/loadingButton";
import { createPlaylist } from "@/actions/createPlaylist";

const CreatePlaylist = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleOpen = (open: boolean) => {
        if (!open) {
            setOpen(false);
        }
    }

    const createPlaylistHandler = async () => {
        setLoading(true);
        await createPlaylist(title);
        setLoading(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={(open: boolean) => handleOpen(open)}>
            <Card onClick={() => setOpen(true)} className={`w-[280px] overflow-hidden [content-visibility:auto] cursor-pointer`}>
                <CardContent className={'relative w-full aspect-square'}>
                    <img src={'/logo.svg'} alt={'Create Playlist'} className={'absolute w-full h-full inset-0'} />
                    <div className={'absolute inset-0 flex flex-col items-center justify-end gap-2 p-2 bg-black bg-opacity-25 hover:bg-opacity-50'}>
                        <CardTitle className={'text-white [text-shadow:_black_0px_0px_10px]'}>
                            Create New Playlist
                        </CardTitle>
                    </div>
                </CardContent>
            </Card>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Playlist</DialogTitle>
                </DialogHeader>
                <div className={'flex flex-col gap-4 p-4'}>
                    <div className={'grid grid-cols-4 items-center gap-4'}>
                        <Label htmlFor={'title'}>Title:</Label>
                        <Input className={'col-span-3'} id={'title'} placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className={'grid grid-cols-4 items-center gap-4'}>
                        <Label htmlFor={'description'}>Description:</Label>
                        <Textarea className={'col-span-3'} id={'description'} placeholder={'Description'} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <div className={'md:w-[150px]'}>
                        <LoadingButton loading={loading} type={'button'} disabled={loading} onClick={createPlaylistHandler}>Create Playlist</LoadingButton>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePlaylist;