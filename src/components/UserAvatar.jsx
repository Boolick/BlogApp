import { useState } from "react";
import { Spinner, Image } from "react-bootstrap";
import PropTypes from "prop-types";

function UserAvatar({ src }) {
  const [isLoadAvatar, setIsLoadAvatar] = useState(true);

  return (
    <>
      {isLoadAvatar && <Spinner className="m-5" animation="border" />}
      <Image
        style={{
          width: "250px",
          height: "256px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        src={src}
        alt="Avatar image"
        onLoad={() => setIsLoadAvatar(false)}
        hidden={isLoadAvatar}
      />
    </>
  );
}
export default UserAvatar;

UserAvatar.propTypes = {
  src: PropTypes.string.isRequired,
};
