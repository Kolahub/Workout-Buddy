import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <section className={styles.intro}>
                    <h2>Welcome to Workout Buddy</h2>
                    <p>Your perfect companion for a healthy and fit lifestyle.</p>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
