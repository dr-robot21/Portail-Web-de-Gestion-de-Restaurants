import styles from "./PrimaryButton.module.css"

function PrimaryButton({ icon, content }) {
  return (
    <button className={styles.primaryBtn}>
      {icon}
      <span className={styles.content}>{content}</span>
    </button>
  );
}

export default PrimaryButton;
