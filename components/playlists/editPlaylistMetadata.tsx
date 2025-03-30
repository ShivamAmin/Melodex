'use client'

import { useState, MouseEvent } from "react";
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
import PlexImage from "@/components/plexImage";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import poster from '@/types/poster';
import { cn } from '@/lib/utils';

function EditPlaylistMetadata({ ratingKey, title, description }: { ratingKey: string, title: string, description: string }) {
    const { plexAuthToken } = usePlexOAuth();
    const [localTitle, setLocalTitle] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [originalSelectedPosterKey, setOriginalSelectedPosterKey] = useState<string>('');
    const [selectedPosterKey, setSelectedPosterKey] = useState<string>('');
    const [posters, setPosters] = useState<poster[]>([]);

    const preventDefault = (e: MouseEvent) => {
        e.preventDefault();
    }

    const getPosters = async () => {
        const url = `https://plex.shivamamin.com/library/metadata/${ratingKey}/posters`;
        if (plexAuthToken) {
            const req = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    'X-Plex-Token': plexAuthToken
                }
            }).then(resp => resp.json());
            setPosters(req.MediaContainer.Metadata);
            setOriginalSelectedPosterKey(req.MediaContainer.Metadata.find((p: poster) => p.selected).key);
        }
    }

    const selectPoster = (poster: poster) => {
        const tmp: poster[] = [...posters]
        const toBeSelectedIdx = posters.findIndex((p: poster) => p.key === poster.key);
        const toBeUnselectedIdx = posters.findIndex((p: poster) => p.selected);
        const toBeSelected: poster = {...tmp[toBeSelectedIdx]}
        const toBeUnselected: poster = {...tmp[toBeUnselectedIdx]}
        toBeSelected.selected = true;
        toBeUnselected.selected = false;
        tmp[toBeSelectedIdx] = toBeSelected;
        tmp[toBeUnselectedIdx] = toBeUnselected;
        setSelectedPosterKey(toBeSelected.key);
        setPosters(tmp);
    }

    const uploadPoster = () => {
        //by url
        // fetch("https://192-168-0-3.a364f0e5bc984b849af183f41f722bc0.plex.direct:32400/library/metadata/1000003/posters?url=https%3A%2F%2Fi.imgur.com%2FSVnmrva.jpeg&X-Plex-Product=Plex%20Web&X-Plex-Version=4.145.1&X-Plex-Client-Identifier=8wab5v00c8wycfxpsnvtka0d&X-Plex-Platform=Chrome&X-Plex-Platform-Version=134.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=bundled&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1438x1094%2C1440x2560&X-Plex-Token=686ZpuX74RxGxGeE5qrG&X-Plex-Language=en&X-Plex-Session-Id=c5a7fbdd-611f-418c-892e-c2d73f01de01", {
        //     "headers": {
        //         "accept": "text/plain, */*; q=0.01",
        //         "accept-language": "en",
        //         "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "empty",
        //         "sec-fetch-mode": "cors",
        //         "sec-fetch-site": "cross-site"
        //     },
        //     "referrer": "https://plex.shivamamin.com/",
        //     "referrerPolicy": "strict-origin-when-cross-origin",
        //     "body": null,
        //     "method": "POST",
        //     "mode": "cors",
        //     "credentials": "omit"
        // });
        //by image
        // fetch("https://192-168-0-3.a364f0e5bc984b849af183f41f722bc0.plex.direct:32400/library/metadata/1000003/posters?X-Plex-Product=Plex%20Web&X-Plex-Version=4.145.1&X-Plex-Client-Identifier=8wab5v00c8wycfxpsnvtka0d&X-Plex-Platform=Chrome&X-Plex-Platform-Version=134.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=bundled&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1438x1094%2C1440x2560&X-Plex-Token=686ZpuX74RxGxGeE5qrG&X-Plex-Language=en&X-Plex-Session-Id=c5a7fbdd-611f-418c-892e-c2d73f01de01", {
        //     "headers": {
        //         "accept": "text/plain, */*; q=0.01",
        //         "accept-language": "en",
        //         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        //         "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "empty",
        //         "sec-fetch-mode": "cors",
        //         "sec-fetch-site": "cross-site"
        //     },
        //     "referrer": "https://plex.shivamamin.com/",
        //     "referrerPolicy": "strict-origin-when-cross-origin",
        //     "method": "POST",
        //     "mode": "cors",
        //     "credentials": "omit"
        // });
    }

    const updatePlaylist = async () => {
        console.log('Should update poster: ', originalSelectedPosterKey !== selectedPosterKey)
        //req 1:
        // fetch("https://192-168-0-3.a364f0e5bc984b849af183f41f722bc0.plex.direct:32400/playlists/1000003?title=Test%20playlist%20name%20change&summary=This%20is%20a%20test%20playlist%20to%20test%20Melodex.%20summary%20change&X-Plex-Product=Plex%20Web&X-Plex-Version=4.145.1&X-Plex-Client-Identifier=8wab5v00c8wycfxpsnvtka0d&X-Plex-Platform=Chrome&X-Plex-Platform-Version=134.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=bundled&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1438x1094%2C1440x2560&X-Plex-Token=686ZpuX74RxGxGeE5qrG&X-Plex-Language=en&X-Plex-Session-Id=c5a7fbdd-611f-418c-892e-c2d73f01de01&X-Plex-Drm=widevine&X-Plex-Text-Format=plain&X-Plex-Provider-Version=7.2", {
        //     "headers": {
        //         "accept": "application/json",
        //         "accept-language": "en",
        //         "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        //         "sec-ch-ua-mobile": "?0",
        //         "sec-ch-ua-platform": "\"Windows\"",
        //         "sec-fetch-dest": "empty",
        //         "sec-fetch-mode": "cors",
        //         "sec-fetch-site": "cross-site"
        //     },
        //     "referrer": "https://plex.shivamamin.com/",
        //     "referrerPolicy": "strict-origin-when-cross-origin",
        //     "body": null,
        //     "method": "PUT",
        //     "mode": "cors",
        //     "credentials": "omit"
        // });
        if (originalSelectedPosterKey !== selectedPosterKey) {
            //update poster:
            // fetch("https://192-168-0-3.a364f0e5bc984b849af183f41f722bc0.plex.direct:32400/library/metadata/1000003/poster?url=default%3A%2F%2F&X-Plex-Product=Plex%20Web&X-Plex-Version=4.145.1&X-Plex-Client-Identifier=8wab5v00c8wycfxpsnvtka0d&X-Plex-Platform=Chrome&X-Plex-Platform-Version=134.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=bundled&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1438x1094%2C1440x2560&X-Plex-Token=686ZpuX74RxGxGeE5qrG&X-Plex-Language=en&X-Plex-Session-Id=c5a7fbdd-611f-418c-892e-c2d73f01de01", {
            //     "headers": {
            //         "accept": "text/plain, */*; q=0.01",
            //         "accept-language": "en",
            //         "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
            //         "sec-ch-ua-mobile": "?0",
            //         "sec-ch-ua-platform": "\"Windows\"",
            //         "sec-fetch-dest": "empty",
            //         "sec-fetch-mode": "cors",
            //         "sec-fetch-site": "cross-site"
            //     },
            //     "referrer": "https://plex.shivamamin.com/",
            //     "referrerPolicy": "strict-origin-when-cross-origin",
            //     "body": null,
            //     "method": "PUT",
            //     "mode": "cors",
            //     "credentials": "omit"
            // });
        }
    }

    const handleOpen = (open: boolean) => {
        if (!open) {
            setTimeout(() => {
                setLocalTitle('');
                setLocalDescription('');
            }, 100);
        } else {
            getPosters();
        }
    }

    return (
        <Dialog onOpenChange={(open: boolean) => handleOpen(open)}>
            <div onClick={preventDefault}>
                <DialogTrigger className={'size-6'}>
                    <SquarePen color={'white'} className={'size-6'} />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Playlist Metadata</DialogTitle>
                        <DialogDescription className={'flex flex-col gap-4 p-4'}>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'title'}>Title:</Label>
                                <Input className={'col-span-3'} id={'title'} placeholder={'né ' + title} value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
                            </div>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'description'}>Description:</Label>
                                <Textarea className={'col-span-3'} id={'description'} placeholder={description} value={localDescription} onChange={(e) => setLocalDescription(e.target.value)} />
                            </div>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <Label htmlFor={'coverImage'}>Cover Image:</Label>
                                <Input className={'col-span-3'} id={'coverImage'} value={''} />
                            </div>
                            <div className={'h-[150px] overflow-scroll'}>
                                <div className={'flex flex-wrap gap-4'}>
                                    {posters.map((poster: poster) => {
                                        return (
                                            <div onClick={() => selectPoster(poster)} className={cn('hover:outline hover:-outline-offset-2 hover:outline-amber-300 relative', {
                                                'outline -outline-offset-2 outline-amber-300': poster.selected,
                                                'before:border-r-[40px] before:border-b-[40px] before:top-0 before:right-0 before:border-t-amber-300 before:border-r-amber-300 before:border-b-transparent before:border-l-transparent before:border-solid before:block before:absolute': poster.selected,
                                                'after:text-[18px]/[25px] after:h-[25px] after:w-[25px] after:text-orange-900 after:content-["✓"] after:block after:absolute after:right-0 after:top-0 after:text-center': poster.selected
                                            })}>
                                                    <PlexImage key={poster.thumb} src={poster.thumb} alt={'poster'} style={{ height: '100px', width: 'auto' }}  height={100} width={150} />
                                            </div>
                                        )
                                    })}
                                </div>
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
