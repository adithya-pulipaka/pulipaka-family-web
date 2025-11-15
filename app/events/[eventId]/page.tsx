"use client";
import React, { ChangeEvent, use, useState } from "react";
import storage from "@/lib/firebase";
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  FullMetadata,
} from "firebase/storage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

// {
//     "type": "file",
//     "bucket": "fir-poc-bb964.firebasestorage.app",
//     "generation": "1762922022374496",
//     "metageneration": "1",
//     "fullPath": "albums/1/ATTBill_9940_Feb2025.pdf",
//     "name": "ATTBill_9940_Feb2025.pdf",
//     "size": 663661,
//     "timeCreated": "2025-11-12T04:33:42.377Z",
//     "updated": "2025-11-12T04:33:42.377Z",
//     "md5Hash": "sEQdEVTEPUJX5qV6eSCz2w==",
//     "contentDisposition": "inline; filename*=utf-8''ATTBill_9940_Feb2025.pdf",
//     "contentEncoding": "identity",
//     "contentType": "application/pdf"
// }

interface Image {
  bucket: string;
  fullPath: string;
  name: string;
  size: number;
  contentType: string | undefined;
  md5Hash: string | undefined;
}

interface AlbumInfo {
  albumId: string;
  eventId: string;
  images: Array<Image>;
}

const EventDetails = ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = use(params);
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>({
    albumId: "",
    eventId: eventId,
    images: [],
  });

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const storageRef = ref(storage);
    const albumRef = ref(storageRef, `albums/${albumInfo?.albumId}`);
    const files: FileList | null = event.target.files;
    const fileUploadRes: Image[] = [];
    if (files) {
      for (const file of files) {
        const fileRef = ref(albumRef, file.name);
        const result = await uploadBytes(fileRef, file);
        const metadata: FullMetadata = result.metadata;
        fileUploadRes.push({
          bucket: metadata.bucket,
          fullPath: metadata.fullPath,
          name: metadata.name,
          size: metadata.size,
          contentType: metadata.contentType,
          md5Hash: metadata.md5Hash,
        });
      }
    }
    const updatedAlbum = {
      ...albumInfo,
      images: [...albumInfo.images, ...fileUploadRes],
    };
    const res = await axios.post(
      `http://localhost:8000/albums?album_id=${updatedAlbum.albumId}`,
      updatedAlbum
    );
    console.log(res.data);
  };

  const createAlbum = async () => {
    const response = await axios.post(
      `http://localhost:8000/albums?event_id=${eventId}`
    );
    setAlbumInfo(response.data);
  };
  return (
    <>
      <div className="flex">
        <div>
          <Button onClick={createAlbum}>
            <Spinner />
            Create Album
          </Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" onChange={onUpload} multiple />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
