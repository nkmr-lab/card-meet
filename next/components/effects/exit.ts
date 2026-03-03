import debug from "debug";
import { API_URL_prefix } from "../utils/api";
const log = debug("effect:exit");

export const exitRoom = ({ channelId, myMemberId }: { channelId: string, myMemberId: string }) => {
  log("exitRoom()");

  const yes = confirm("Are you sure to exit?");
  if (!yes) {
    log("canceled");
    return;
  }

  location.href = "/";

  console.log("kokoda myMemberId: " + myMemberId);
  console.log("kokoda channelId: " + channelId);
  fetch(API_URL_prefix + "/rooms/" + channelId + "/" + myMemberId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
};