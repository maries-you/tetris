import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TetrisTest {
    private WebDriver driver;
    static final private String firstPage = "http://dev.tetris.pet-projets.ru/";
    static final private String secondPage = "http://dev.tetris.pet-projets.ru/game.html";

    @BeforeEach
    void setUp() {
        System.setProperty("webdriver.gecko.driver", "/home/kirillkry/tetris/driver/geckodriver");
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
    void gameSpeed() throws InterruptedException {
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
    void gameLevel() throws InterruptedException {
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
}
