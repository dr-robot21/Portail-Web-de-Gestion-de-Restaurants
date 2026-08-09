import styles from "./PrimaryButton.module.css"

function PrimaryButton({ icon, content, onClick, type = 'button', ...rest }) {
  return (
    <button type={type} className={styles.primaryBtn} onClick={onClick} {...rest}>
      {icon}
      <span className={styles.content}>{content}</span>
    </button>
  );
}

export default PrimaryButton;
