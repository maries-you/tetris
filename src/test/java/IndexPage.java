import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class IndexPage {
    protected WebDriver driver;
    private By nameField = By.id("name");
    private By submit = By.className("submit");

    public IndexPage(WebDriver driver) {
        this.driver = driver;
    }

    public void authorization(String name) {
        driver.findElement(nameField).sendKeys(name);
        driver.findElement(submit).click();
    }

}
