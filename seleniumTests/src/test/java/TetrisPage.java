import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class TetrisPage {
    protected WebDriver driver;

    static final private By head = By.cssSelector("h1");
    static final private By nicknameOnPage = By.id("name");
    static final private By currentGameSpeed = By.id("outSpeed");
    static final private By currentGameLevel = By.id("levelGame");
    static final private By plusSpeed = By.id("plusSpeed");
    static final private By minusSpeed = By.id("minusSpeed");
    static final private By plusLevel = By.id("plusLevel");
    static final private By minusLevel = By.id("minusLevel");

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

    public void clickOnMinusSpeed(){driver.findElement(minusSpeed).click();}

    public void clickOnMinusLevel(){driver.findElement(minusLevel).click();}
}
