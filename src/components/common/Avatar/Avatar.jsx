import './Avatar.scss';

const Avatar = ({ email, size = 40 }) => {
    const initial = email ? email.charAt(0).toUpperCase() : '';
    return (
        <span
            className="avatar"
            style={{ width: size, height: size, fontSize: size * 0.4 }}
            aria-hidden="true"
        >
      {initial}
    </span>
    );
};

export default Avatar;