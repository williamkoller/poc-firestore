import { Injectable } from '@nestjs/common';
import { database, productCollection } from '../database/product.database';
import { AddProductDto } from '../dtos/add-product.dto';
import { Product } from '../interface/product.interface';
import { v4 } from 'uuid';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  async add(addProductDto: AddProductDto): Promise<any> {
    const product: Product = {
      id: v4(),
      name: addProductDto.name,
      description: addProductDto.description,
    };
    const result = (await database.collection(productCollection).add(product))
      .get()
      .then((snapShot) => {
        const data = snapShot.data();
        return data;
      });

    return result;
  }

  async update(id: string, updateProdutDto: UpdateProductDto): Promise<any> {
    await database
      .collection(productCollection)
      .doc(id)
      .set(updateProdutDto, { merge: true });
  }
}
