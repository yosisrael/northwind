class AppConfig {
    public readonly productsRoute = "/products/";
    public readonly addNewProductRoute = this.productsRoute + "new/";
    public readonly editProductRoute = this.productsRoute + "edit/";
    public readonly productDetailsRoute = this.productsRoute + "details/"

    public readonly employeesRoute = "/employees/";
    public readonly newEmployeesRoute = this.employeesRoute + "new/";
    public readonly editEmployeesRoute = this.employeesRoute + "edit/";
    public readonly employeeDetailsRoute = this.employeesRoute + "details/";


    public readonly categoriesRoute = "/categories/";
    public readonly categoryDetailsRoute = this.categoriesRoute + "details/";
    public readonly editCategoryRoute = this.categoriesRoute + "edit/";
    public readonly newCategoryRoute = this.categoriesRoute + "new/";
    



    public readonly aboutRoute = "/about";
    public readonly homeRoute = "/home";
    public readonly registerRoute = "/register";
    public readonly loginRoute = "/login";



    public readonly apiBaseUrl = "http://localhost:3030/api/";
    public readonly productsUrl = this.apiBaseUrl + "products/";
    public readonly ProductsImagesUrl = this.productsUrl + "images/";

    public readonly employeesUrl = this.apiBaseUrl + "employees/";
    public readonly employeesImagesUrl = this.employeesUrl + "images/";

    public readonly registerUrl = this.apiBaseUrl + "register";
    public readonly loginUrl = this.apiBaseUrl + "login";

    public readonly categoriesUrl = this.apiBaseUrl + "categories/"

}

const appConfig = new AppConfig();

export default appConfig;