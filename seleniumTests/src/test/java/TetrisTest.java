import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TetrisTest {
    private WebDriver driver;
    static final private String firstPage = "http://dev.tetris.pet-projets.ru/";
    static final private String secondPage = "http://dev.tetris.pet-projets.ru/game.html";

    @BeforeAll
    static void driverDownload() {
        WebDriverManager.firefoxdriver().setup();
    }

    @BeforeEach
    void setUp() {
        driver = new FirefoxDriver();
        driver.get(firstPage);
    }

    @AfterEach
    void tearDown() {
        driver.quit();
    }

    @Test
    void tetrisOpen() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String nick = DataGeneration.generateNick();
        service.authorization(nick);
        Thread.sleep(1000);

        String head = tetris.getHeadText();
        String Expected = "Tetris";

        Assertions.assertEquals(Expected, head);
    }

    @Test
    void saveNickname() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.generateNick();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        String nameOnPage = tetris.getNameOnPage();

        Assertions.assertEquals(generatedNick, nameOnPage);
    }

    @Test
    void gameSpeedPlus() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.generateNick();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        int speedBeforeClick = tetris.getCurrentGameSpeed();
        tetris.clickOnPlusSpeed();
        int speedAfterClick = tetris.getCurrentGameSpeed();

        Assertions.assertEquals(speedBeforeClick + 1, speedAfterClick);
    }

    @Test
    void gameSpeedMinus() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.generateNick();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        tetris.clickOnPlusSpeed();
        int speedBeforeClick = tetris.getCurrentGameSpeed();
        tetris.clickOnMinusSpeed();
        int speedAfterClick = tetris.getCurrentGameSpeed();

        Assertions.assertEquals(speedAfterClick, speedBeforeClick - 1);
    }

    @Test
    void gameLevelPlus() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.generateNick();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        int levelBeforeClick = tetris.getCurrentGameLevel();
        tetris.clickOnPlusLevel();
        int levelAfterClick = tetris.getCurrentGameLevel();

        Assertions.assertEquals(levelBeforeClick + 1, levelAfterClick);
    }

    @Test
    void gameLevelMinus() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.generateNick();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        tetris.clickOnPlusLevel();
        int levelBeforeClick = tetris.getCurrentGameLevel();
        tetris.clickOnMinusLevel();
        int levelAfterClick = tetris.getCurrentGameLevel();

        Assertions.assertEquals(levelAfterClick, levelBeforeClick - 1);
    }
}
