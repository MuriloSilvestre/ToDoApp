import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap, map } from 'rxjs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Product } from '../entities/product.entity';
import { environment } from '../../../environments/environment';

const AUTH_API = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public basicForm!: FormGroup;

  constructor(protected http: HttpClient, private fb: FormBuilder) {
    this.initializeForm();
  }

  public list() {
    return this.http.get<Product[]>(`${AUTH_API}/product`);
  }

  public getOneById(id: number) {
    if (id != null && id > 0) {
      return this.http.get<Product>(`${AUTH_API}/product/${id}`).pipe(take(1));
    } else {
      return null;
    }
  }

  //Chamada para o método Post: Método Private o método Public correspondente é "Salvar"
  private create(registro: Product) {
    return this.http.post<Product>(`${AUTH_API}/product`, registro).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro inserido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  //Chamada para o método Delete
  public remove(id: number) {
    return this.http.delete(`${AUTH_API}/product/${id}`).pipe(
      take(1),
      tap()
      //   (data) => this.toastr.success('Registro removido com sucesso'),
      //   (error) => this.toastr.error(error.error.message)
    );
  }

  private update(registro: Product) {
    return this.http.put(`${AUTH_API}/product/${registro.id}`, registro).pipe(
      take(1),
      tap()
      // (data) => this.toastr.success('Registro atualizado com sucesso'),
      // (error) => this.toastr.error(error.error.message)
    );
  }

  //Método Public para as operações de Post e PUT
  private save(registro: Product) {
    if (registro.id && registro.id > 0) {
      return this.update(registro);
    } else {
      return this.create(registro);
    }
  }

  public initializeForm() {
    this.basicForm = this.fb.group({
      id: [0, Validators.compose([])],
      decricao: ['', Validators.compose([Validators.required])],
      ncm: [Validators.compose([])],
      cfop: [Validators.compose([])],
      ean: [Validators.compose([])],
      ean_tributavel: [Validators.compose([])],
      cest: [Validators.compose([])],
      unidade_comercial: [0, Validators.compose([Validators.required])],
      quantidade: [0, Validators.compose([Validators.required])],
      quantidade_atacado: [, Validators.compose([])],
      valor_pago: [0, Validators.compose([Validators.required])],
      valor_varejo: [0, Validators.compose([Validators.required])],
      valor_atacado: [, Validators.compose([])],
      validade: [Date.now(), Validators.compose([Validators.required])],
      ultima_compra: [Date.now(), Validators.compose([Validators.required])],
      fornecedor: [
        this.fb.group({
          cnpj: ['', Validators.compose([Validators.required])],
          razao_social: ['', Validators.compose([Validators.required])],
          nome_fantasia: ['', Validators.compose([Validators.required])],
          telefone: ['', Validators.compose([Validators.required])],
        }),
      ],
      icms: this.fb.group({
        origem: [0, Validators.compose([Validators.required])],
        cst: [0, Validators.compose([Validators.required])],
        bc: [0, Validators.compose([Validators.required])],
        porcentagem_icms: [0, Validators.compose([Validators.required])],
        bcst: [0, Validators.compose([Validators.required])],
        percentagem_icmsst: [0, Validators.compose([Validators.required])],
        bcfcpst: [0, Validators.compose([Validators.required])],
      }),
      pis: this.fb.group({
        cst: [0, Validators.compose([Validators.required])],
        bc: [0, Validators.compose([Validators.required])],
        porcentagem_pis: [0, Validators.compose([Validators.required])],
      }),
      ipi: this.fb.group({
        cst: [0, Validators.compose([Validators.required])],
        bc: [0, Validators.compose([Validators.required])],
        porcentagem_ipi: [0, Validators.compose([Validators.required])],
      }),
      cofins: this.fb.group({
        cst: [0, Validators.compose([Validators.required])],
        bc: [0, Validators.compose([Validators.required])],
        porcentagem_cofins: [0, Validators.compose([Validators.required])],
      }),
    });
  }

  public fillForm(Product: Product) {
    this.basicForm.patchValue({
      id: Product.id,
      decricao: Product.decricao,
      ncm: Product.ncm,
      cfop: Product.cfop,
      ean: Product.ean,
      ean_tributavel: Product.ean_tributavel,
      cest: Product.cest,
      unidade_comercial: Product.unidade_comercial,
      quantidade: Product.quantidade,
      quantidade_atacado: Product.quantidade_atacado,
      valor_pago: Product.valor_pago,
      valor_varejo: Product.valor_varejo,
      valor_atacado: Product.valor_atacado,
      validade: Product.validade,
      ultima_compra: Product.ultima_compra,
      fornecedor: [
        {
          ...Product.fornecedor,
        },
      ],
      icms: {
        origem: Product.icms.origem,
        cst: Product.icms.cst,
        bc: Product.icms.bc,
        porcentagem_icms: Product.icms.porcentagem_icms,
        bcst: Product.icms.bcst,
        percentagem_icmsst: Product.icms.percentagem_icmsst,
        bcfcpst: Product.icms.bcfcpst,
      },
      pis: {
        cst: Product.pis.cst,
        bc: Product.pis.bc,
        porcentagem_pis: Product.pis.porcentagem_pis,
      },
      ipi: {
        cst: Product.ipi.cst,
        bc: Product.ipi.bc,
        porcentagem_ipi: Product.ipi.porcentagem_ipi,
      },
      cofins: {
        cst: Product.cofins.cst,
        bc: Product.cofins.bc,
        porcentagem_cofins: Product.cofins.porcentagem_cofins,
      },
    });
  }

  get getBasicForm() {
    return this.basicForm.controls;
  }

  //Limpeza do formulário
  public reset() {
    this.basicForm.reset();
  }

  // Serviços
  public submit() {
    return this.save(this.basicForm.value);
  }

  public handleError(error: HttpErrorResponse) {
    return error;
  }
}
