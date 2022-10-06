import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/SterWrapper";
import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import { useRouter } from "next/router";
import { tracksAPI } from "../../api/tracksAPI";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState<File>();
  const [audio, setAudio] = useState<File>();
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const postTrack = async (formData: FormData) => {
    await tracksAPI.createTrack(formData).then((r) => {
      if (r.status === 201) {
        router.push("/tracks");
      }
    });
  };

  const next = () => {
    if (activeStep === 2) {
      setActiveStep((prev) => prev - 1);
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      if (picture && audio) {
        formData.append("picture", picture);
        formData.append("audio", audio);
      }
      postTrack(formData);
    }
    setActiveStep((prev) => prev + 1);
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label="Название трека"
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label="Имя автора"
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label="Текст к песне"
              multiline
              rows={3}
            />
          </Grid>
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/mp3">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
