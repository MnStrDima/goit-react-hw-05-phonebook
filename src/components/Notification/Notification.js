import styles from './Notification.module.css';

const Notification = ({ message }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Notification;
