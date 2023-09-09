class ProductModel {
    //  we can initialize it since its undefined
    //  we cad optional ? or required !
    // "strictNullChecks": false,
    public id!: number;
    public name?: string;
    public price: number;
    public stock: number;
    public imageUrl: string;
    public image: File;
}


export default ProductModel;