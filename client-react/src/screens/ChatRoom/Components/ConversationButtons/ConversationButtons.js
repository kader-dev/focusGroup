import React, { useState } from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdCamera,
} from "react-icons/md";
import ConversationButton from "./ConversationButton";
import {
  switchForScreenSharingStream,
  hangUp,
} from "../../../../utils/webRTC/webRTCHandler";
import DropdownRender from "../adminDropdown/Dropdown";
import Example from "../adminDropdown/Dropdown";
import Dropdown from "../adminDropdown/Dropdown";

const styles = {
  buttonContainer: {
    display: "flex",
    position: "absolute",
    bottom: "6%",
    left: "35%",
  },
  icon: {
    width: "25px",
    height: "25px",
    fill: "#e6e5e8",
  },
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive,
    groupCall,
    groupCallStreams,
    setMuteAll,
  } = props;

  const [test, setTest] = useState(false);
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };
  const handleMuteAll = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
    groupCallStreams.map((stream, i) => {
      console.log(stream.getAudioTracks());
      stream.getAudioTracks()[i].enabled = false;
      console.log(stream.getAudioTracks());
      setMuteAll(false);
    });
    setTest(true);
  };
  const handleUnmuteAll = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
    groupCallStreams.map((stream, i) => {
      console.log(stream.getAudioTracks());
      stream.getAudioTracks()[i].enabled = true;
      console.log(stream.getAudioTracks());
      setMuteAll(true);
    });
    setTest(false);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic style={styles.icon} />
        ) : (
          <MdMicOff style={styles.icon} />
        )}
      </ConversationButton>

      {!groupCall && (
        <ConversationButton onClickHandler={handleHangUpButtonPressed}>
          <MdCallEnd style={styles.icon} />
        </ConversationButton>
      )}
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={styles.icon} />
        ) : (
          <MdVideocamOff style={styles.icon} />
        )}
      </ConversationButton>
      {groupCall && (
        <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
          {screenSharingActive ? (
            <MdCamera style={styles.icon} />
          ) : (
            <MdVideoLabel style={styles.icon} />
          )}
        </ConversationButton>
      )}
      <ConversationButton>
        <Dropdown
          click={!test ? handleMuteAll : handleUnmuteAll}
          changeText={test}
        />
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;
