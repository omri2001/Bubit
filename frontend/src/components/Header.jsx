import styles from "../../style.module.css";

export default function Header({ user }) {
  return (
    <div className={styles.Header}>
      <h1 className={styles.mainHeader}>Bubit</h1>
      <div className={styles.underHeader}>By TeamSbear</div>
      <div className={styles.userWelcome}>Hello {user}</div>
    </div>
  );
}
