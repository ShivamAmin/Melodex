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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PlexImage from "@/components/plexImage";
import usePlexOAuth from "@/hooks/usePlexOAuth";
import poster from '@/types/poster';
import { cn } from '@/lib/utils';
import LoadingButton from "@/components/loadingButton";
import { Skeleton } from "@/components/ui/skeleton";
import { plexBaseURL } from '@/lib/consts';

function EditPlaylistMetadata({ ratingKey, title, description }: { ratingKey: string, title: string, description: string }) {
    const { plexAuthToken } = usePlexOAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postersLoading, setPostersLoading] = useState(false);
    const [localTitle, setLocalTitle] = useState<string>('');
    const [localDescription, setLocalDescription] = useState<string>('');
    const [originalSelectedPosterKey, setOriginalSelectedPosterKey] = useState<string>('');
    const [selectedPosterKey, setSelectedPosterKey] = useState<string>('');
    const [posters, setPosters] = useState<poster[]>([]);
    const [showPosterUrlInput, setShowPosterUrlInput] = useState<boolean>(false);
    const [externalPosterUrl, setExternalPosterUrl] = useState<string>('');

    const preventDefault = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const getPosters = async () => {
        setPostersLoading(true);
        const url = `${plexBaseURL}/library/metadata/${ratingKey}/posters`;
        if (plexAuthToken) {
            const req = await fetch(url, {
                headers: {
                    Accept: "application/json",
                    'X-Plex-Token': plexAuthToken
                }
            }).then(resp => resp.json());
            setPosters(req.MediaContainer.Metadata);
            const selectedPosterKey = req.MediaContainer.Metadata.find((p: poster) => p.selected).key
            setOriginalSelectedPosterKey(selectedPosterKey);
            setSelectedPosterKey(selectedPosterKey);
        }
        setPostersLoading(false);
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
        setSelectedPosterKey(toBeSelected.ratingKey);
        setPosters(tmp);
    }

    const uploadPosterByURL = async () => {
        const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/posters`);
        posterUrl.searchParams.append("url", externalPosterUrl);
        if (plexAuthToken) {
            await fetch(posterUrl, {
                method: "POST",
                headers: {
                    'X-Plex-Token': plexAuthToken
                }
            });
            getPosters();
            setExternalPosterUrl('');
            setOpen(false);
        }
    }

    const uploadPosterByImages = async (e: ChangeEvent<HTMLInputElement>) => {
        const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/posters`);
        if (e.target.files?.length && plexAuthToken) {
            const files = Array.from(e.target.files)

            await Promise.all(files.map(file => {
                const fr = new FileReader();
                fr.readAsArrayBuffer(file);
                return fr.onload = () => {
                    return fetch(posterUrl, {
                        method: "POST",
                        headers: {
                            'X-Plex-Token': plexAuthToken
                        },
                        body: fr.result
                    })
                }
            })).then(values => {
                console.log(values);
                getPosters();
            })
        }
    }

    const updatePlaylist = async () => {
        setLoading(true);
        if (shouldTitleUpdate() || shouldDescriptionUpdate()) {
            const metadataUrl = new URL(`${plexBaseURL}/playlists/${ratingKey}`);
            shouldTitleUpdate() && metadataUrl.searchParams.append("title", localTitle);
            shouldDescriptionUpdate() && metadataUrl.searchParams.append("summary", localDescription);
            if (plexAuthToken) {
                setLoading(true);
                await fetch(metadataUrl.toString(), {
                    method: "PUT",
                    headers: {
                        'X-Plex-Token': plexAuthToken
                    }
                })
            }
        }
        if (shouldPosterUpdate()) {
            const posterUrl = new URL(`${plexBaseURL}/library/metadata/${ratingKey}/poster`);
            posterUrl.searchParams.append("url", selectedPosterKey);
            if (plexAuthToken) {
                await fetch(posterUrl.toString(), {
                    method: "PUT",
                    headers: {
                        'X-Plex-Token': plexAuthToken
                    }
                })
            }
        }
        setTimeout(() => {
            setOpen(false);
            setTimeout(() => {
                setLocalTitle('');
                setLocalDescription('');
                setLoading(false);
            }, 100)
        }, 500)
    }

    const initialize = () => {
        setOpen(true);
        getPosters();
    }

    const handleOpen = (open: boolean) => {
        if (!open) {
            setTimeout(() => {
                setLocalTitle('');
                setLocalDescription('');
                setOpen(false);
            }, 100);
        } else {
            getPosters();
        }
    }

    const shouldTitleUpdate = () => {
        return localTitle !== title && localTitle !== '';
    }

    const shouldDescriptionUpdate = () => {
        return localDescription !== description && localDescription !== '';
    }

    const shouldPosterUpdate = () => {
        return originalSelectedPosterKey !== selectedPosterKey;
    }


    const shouldButtonBeDisabled = () => {
        return !shouldTitleUpdate() && !shouldDescriptionUpdate() && !shouldPosterUpdate();
    }

    const handleDragEnter = (e: MouseEvent) => {
        console.log(e.target)
    }

    return (
        <Dialog open={open} onOpenChange={(open: boolean) => handleOpen(open)}>
            <div onClick={preventDefault}>
                <SquarePen color={'white'} className={'size-6'} onClick={() => initialize()} />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Playlist Metadata</DialogTitle>
                        <DialogDescription className={''}>
                            Test string
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'flex flex-col gap-4 p-4'}>
                        <div className={'grid grid-cols-4 items-center gap-4'}>
                            <Label htmlFor={'title'}>Title:</Label>
                            <Input className={'col-span-3'} id={'title'} placeholder={'né ' + title} value={localTitle} onChange={(e) => setLocalTitle(e.target.value)} />
                        </div>
                        <div className={'grid grid-cols-4 items-center gap-4'}>
                            <Label htmlFor={'description'}>Description:</Label>
                            <Textarea className={'col-span-3'} id={'description'} placeholder={description} value={localDescription} onChange={(e) => setLocalDescription(e.target.value)} />
                        </div>
                        <div style={
                            {
                                backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(215.4, 16.3%, 46.9%) 1px, transparent 0)',
                                backgroundSize: '8px 8px',
                            }
                        } onDragEnter={handleDragEnter}  id={'dropArea'}>
                            <div className={'grid grid-cols-4 items-center gap-4'}>
                                <div style={
                                    {
                                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                        backgroundSize: '1px 1px',
                                    }
                                } className={'row-span-5 h-full flex justify-start items-center -mr-2.5'}>
                                    <Label className={'row-span-2'} htmlFor={'poster'}>Poster:</Label>
                                </div>
                                <div className={'col-span-3 row-span-5 h-full flex justify-center items-center'}>
                                    {showPosterUrlInput ? (
                                        <div className={'w-full mt-[8px] pr-[10px] grid grid-cols-4 items-center'}>
                                            <Input style={
                                                {
                                                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                                    backgroundSize: '1px 1px',
                                                }
                                            } className={'col-span-3'} placeholder={'Enter a url to upload an image'} value={externalPosterUrl} onChange={(e) => setExternalPosterUrl(e.target.value)} />
                                            <Button style={
                                                {
                                                    backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
                                                    backgroundSize: '1px 1px',
                                                }
                                            } className={'col-span-1'} onClick={() => uploadPosterByURL()}>&gt;</Button>
                                            <span style={
                                                {
                                                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                                    backgroundSize: '1px 1px',
                                                }
                                            } onClick={() => setShowPosterUrlInput(false)} className={'mt-[1px] col-span-3 text-xs cursor-pointer justify-self-end'}>Cancel</span>
                                        </div>
                                    ) : (
                                        <div style={
                                            {
                                                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                                backgroundSize: '1px 1px',
                                            }
                                        } className={'px-2 pb-[2px]'}>
                                            <Label className={'font-bold cursor-pointer'} htmlFor={'uploadPoster'} onClick={(e) => e.stopPropagation()}>Upload Image</Label>
                                            <Input type={"file"} id={'uploadPoster'} onChange={uploadPosterByImages} className={'hidden'} onClick={(e) => e.stopPropagation()} multiple />
                                            <span className={'font-bold cursor-default'} id={'separator'}> | </span>
                                            <Label className={'font-bold hidden md:inline'}>Drag and Drop</Label>
                                            <span className={'font-bold cursor-default hidden md:inline'} id={'separator'}> | </span>
                                            <Label onClick={() => setShowPosterUrlInput(true)} className={'font-bold cursor-pointer'}>Enter Url</Label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {postersLoading ? (
                                <Skeleton className={'h-[150px] mt-4 mb-2 w-full'} />
                            ) : (
                                <div className={'h-[150px] overflow-scroll mt-4 mb-2 pb-2'}>
                                    <div className={'flex flex-wrap gap-4 p-2'}>
                                        {posters.map((poster: poster) => {
                                            return (
                                                <div key={poster.key} onClick={() => selectPoster(poster)} className={cn('hover:outline hover:-outline-offset-2 hover:outline-amber-300 relative', {
                                                    'outline -outline-offset-2 outline-amber-300': poster.selected,
                                                    'before:border-r-[42px] before:border-b-[42px] before:top-0 before:right-0 before:border-t-amber-300 before:border-r-amber-300 before:border-b-transparent before:border-l-transparent before:border-solid before:block before:absolute': poster.selected,
                                                    'after:h-[18px] after:w-[18px] after:content-[url(/checkmark.svg)] after:block after:absolute after:right-[4px] after:top-[2px]': poster.selected
                                                })}>
                                                    <PlexImage key={poster.thumb} src={poster.thumb} alt={'poster'} style={{ height: '100px', width: 'auto' }}  height={100} width={150} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <div className={'md:w-[50px]'}>
                            <LoadingButton loading={loading} type={'button'} disabled={shouldButtonBeDisabled() || loading} onClick={updatePlaylist}>Update Playlist</LoadingButton>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default EditPlaylistMetadata
