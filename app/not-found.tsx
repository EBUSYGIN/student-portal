import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Похоже, такой страницы не существует или она была перемещена.
        </p>
      </section>
    </main>
  );
}
