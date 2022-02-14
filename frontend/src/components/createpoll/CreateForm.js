import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { voteCreate, voteImageCreate } from "../../services/api/PollApi";
import BasicForm from "./BasicForm";
import PollImageOptions from "./PollImageOptions";
import PollTextOptions from "./PollTextOptions";
import { getLoggedUserId } from "../../utils/loggedUser";

function CreateForm() {
  const loggedUserId = getLoggedUserId();
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([0]);

  const [vote, setVote] = useState({
    voteName: "",
    voteContent: "",
    voteType: "true",
    voteExpirationTime: "",
    userAnonymousType: false,
    voteAnonymousType: false,
    voteCategories: [],
    voteSelects: [],
  });

  // submit
  const handleCreate = async () => {
    try {
      if (vote.voteType === "true") {
        // 텍스트 formData 생성
        const item = vote.voteSelects;
        const tmpList = [];
        for (const [key, value] of item.entries()) {
          const vtitle = {
            selectionTitle: `${key + 1}번 선택지`,
            content: value,
          };
          tmpList.push(vtitle);
        }
        const voteDto = {
          author: loggedUserId,
          voteName: vote.voteName,
          voteContent: vote.voteContent,
          voteType: vote.voteType,
          voteExpirationTime: vote.voteExpirationTime,
          userAnonymousType: vote.userAnonymousType,
          voteAnonymousType: vote.voteAnonymousType,
          voteCategories: vote.voteCategories,
          voteSelects: tmpList,
        };
        const form = new FormData();

        form.append(
          "voteDto",
          new Blob([JSON.stringify(voteDto)], { type: "application/json" })
        );
        const result = await voteCreate(form);
        console.log(result);
        if (result == "success") {
          // result.message에 success 말고, detail로 이동할 수 있는 poll id 붙이기
          navigate("/polls");
        } else {
          alert("투표 생성에 실패하였습니다");
        }
      } else {
        // 이미지 formData 생성
        const item = vote.voteSelects;
        const tmpList = [];
        for (const [key, value] of item.entries()) {
          const vtitle = {
            selectionTitle: `${key + 1}번 선택지`,
          };
          tmpList.push(vtitle);
        }
        const voteDto = {
          author: loggedUserId,
          voteName: vote.voteName,
          voteContent: vote.voteContent,
          voteType: vote.voteType,
          voteExpirationTime: vote.voteExpirationTime,
          userAnonymousType: vote.userAnonymousType,
          voteAnonymousType: vote.voteAnonymousType,
          voteCategories: vote.voteCategories,
          voteSelects: tmpList,
        };
        const form = new FormData();

        form.append(
          "voteDto",
          new Blob([JSON.stringify(voteDto)], { type: "application/json" })
        );

        // vote.voteSelects.map((file) => {
        //   form.append('votePhotos', file);
        // });
        for (var i = 0; i <= imageList.length; i++) {
          form.append("votePhotos", vote.voteSelects[i]);
        }
        const result = await voteImageCreate(form);
        console.log(result);
        if (result == "success") {
          // result.message에 success 말고, detail로 이동할 수 있는 poll id 붙이기
          navigate("/polls");
        } else {
          alert("투표 생성에 실패하였습니다. ");
        }
      }
    } catch (error) {
      alert("투표 생성에 실패하였습니다.");
    }
  };
  return (
    <>
      <Box>
        <BasicForm vote={vote} setVote={setVote} />
        {vote.voteType === "true" ? (
          <PollTextOptions vote={vote} setVote={setVote} />
        ) : (
          <>
            <PollImageOptions
              vote={vote}
              setVote={setVote}
              imageList={imageList}
              setImageList={setImageList}
            />
          </>
        )}
        {!vote.voteName || !vote.voteContent ? (
          <>
            <Button variant="contained" disabled>
              Create
            </Button>{" "}
            <br />
            <Typography variant="caption" sx={{ color: "red" }}>
              투표 생성에 필요한 모든 정보를 입력하세요.
            </Typography>
          </>
        ) : imageList.length >= 2 || vote.voteSelects.length >= 2 ? (
          <Button variant="contained" onClick={handleCreate}>
            create
          </Button>
        ) : (
          <>
            <Button variant="contained" disabled>
              Create
            </Button>{" "}
            <br />
            <Typography variant="caption" sx={{ color: "red" }}>
              투표 선택지를 2개 이상 생성하세요.
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default CreateForm;
