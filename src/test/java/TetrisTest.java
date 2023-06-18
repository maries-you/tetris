import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class TetrisTest {
    private WebDriver driver;
    private String firstPage = "http://localhost:63342/tetris/frontend/index.html?_ijt=mog1i22qnu9etr2bvohietrrhh&_ij_reload=RELOAD_ON_SAVE";
    private String secondPage = "http://localhost:63342/tetris/frontend/game.html?_ijt=mog1i22qnu9etr2bvohietrrhh&_ij_reload=RELOAD_ON_SAVE";


    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        driver.get(firstPage);
    }

    @AfterEach
    void tearDown() {
        driver.quit();
        driver = null;
    }


    @Test
    void tetrisOpen() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String nick = DataGeneration.getNickname().getNickname();
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

        String generatedNick = DataGeneration.getNickname().getNickname();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        String nameOnPage = tetris.getNameOnPage();

        Assertions.assertEquals(generatedNick, nameOnPage);
    }

    @Test
    void gameSpeed() throws InterruptedException {
        IndexPage service = new IndexPage(driver);
        TetrisPage tetris = new TetrisPage(driver);

        String generatedNick = DataGeneration.getNickname().getNickname();
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

        String generatedNick = DataGeneration.getNickname().getNickname();
        service.authorization(generatedNick);
        Thread.sleep(1000);

        int levelBeforeClick = tetris.getCurrentGameLevel();
        tetris.clickOnPlusLevel();
        int levelAfterClick = tetris.getCurrentGameLevel();

        Assertions.assertEquals(levelBeforeClick + 1, levelAfterClick);
    }

}
