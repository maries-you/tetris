import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class TetrisPage {
    protected WebDriver driver;

    private By head = By.cssSelector("h1");
    private By nicknameOnPage = By.id("name");
    private By currentGameSpeed = By.id("outSpeed");
    private By currentGameLevel = By.id("levelGame");
    private By plusSpeed = By.id("plusSpeed");
    private By minusSpeed = By.id("minusSpeed");
    private By plusLevel = By.id("plusLevel");
    private By minusLevel = By.id("minusLevel");

    public TetrisPage(WebDriver driver) {
        this.driver = driver;
    }

    public String getHeadText() {
        return driver.findElement(head).getText();
    }

    public String getNameOnPage() {
        return driver.findElement(nicknameOnPage).getText();
    }

    public int getCurrentGameSpeed() {
        return Integer.parseInt(driver.findElement(currentGameSpeed).getText());
    }

    public void clickOnPlusSpeed() {
        driver.findElement(plusSpeed).click();
    }

    public int getCurrentGameLevel() {
        return Integer.parseInt(driver.findElement(currentGameLevel).getText());
    }

    public void clickOnPlusLevel() {
        driver.findElement(plusLevel).click();
    }
}
