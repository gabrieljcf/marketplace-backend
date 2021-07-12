import { inject, injectable } from "tsyringe";

import { IUpdateProductDocument } from "../../interfaces/IProducts";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class UpdateManyProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute(
    productsIds: string[],
    categoryId: string
  ): Promise<IUpdateProductDocument[]> {
    const data = { category: categoryId };
    const products = await Promise.all(
      productsIds.map(async (id) => {
        const product = await this.productsRepository.update(id, data);
        return product;
      })
    );
    return products;
  }
}

export { UpdateManyProductsUseCase };
