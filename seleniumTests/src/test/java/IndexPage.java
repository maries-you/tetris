import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class IndexPage {
    protected WebDriver driver;
    static final private By nameField = By.id("name");
    static final private By submit = By.className("submit");

    public IndexPage(WebDriver driver) {
        this.driver = driver;
    }

    public void authorization(String name) {
        driver.findElement(nameField).sendKeys(name);
        driver.findElement(submit).click();
    }
}
