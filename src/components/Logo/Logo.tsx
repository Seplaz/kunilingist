import logo from "../../assets/icons/logo.svg";
import styles from "./Logo.module.css";

export const Logo = () => {
	return (
		<>
			<img className={styles.logo} src={logo} alt="Логотип Кунилингист" />
		</>
	);
};
