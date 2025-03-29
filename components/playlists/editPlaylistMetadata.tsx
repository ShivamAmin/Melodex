'use client'
import { useState, MouseEvent, ChangeEvent } from "react";
import { SquarePen } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function EditPlaylistMetadata({ title, description }: {title: string, description: string}) {

    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');
    const [localCoverImage, setLocalCoverImage] = useState('');

    const preventDefault = (e: MouseEvent) => {
        e.preventDefault();
    }

    const updatePlaylist = async () => {

    }

    const resetState = () => {
        setLocalTitle('');
        setLocalDescription('');
        setLocalCoverImage('');
    }

    return (
        <Dialog onOpenChange={() => resetState()}>
            <div onClick={preventDefault}>
                <DialogTrigger className={'size-6'}>
                    <SquarePen color={'white'} className={'size-6'} />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Playlist né '{title}' Metadata </DialogTitle>
                        <DialogDescription className={'flex flex-col gap-4 p-4'}>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'title'}>Title:</Label>
                                <Input className={'col-span-3'} id={'title'} placeholder={title} value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
                            </div>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'description'}>Description:</Label>
                                <Textarea className={'col-span-3'} id={'description'} placeholder={description} value={localDescription} onChange={(e) => setLocalDescription(e.target.value)} />
                            </div>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'coverImage'}>Cover Image:</Label>
                                <Input className={'col-span-3'} id={'coverImage'} value={localCoverImage} onChange={(e) => setLocalCoverImage(e.target.value)} />
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <Button onClick={updatePlaylist}>Update Playlist</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default EditPlaylistMetadata
