import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-encrypt-decrypt',
  templateUrl: './encrypt-decrypt.component.html',
  styleUrls: ['./encrypt-decrypt.component.css']
})
export class EncryptDecryptComponent {
  text: string = '';
  result: string = '';
  successMessage: string = ''; // Armazena a mensagem de sucesso
  errorMessage: string = '';   // Armazena a mensagem de erro
  secretKey: string = 'mySecretKey123';

  // Método para criptografar o texto usando AES
  encryptText(): void {
    if (this.text.trim()) {
      this.result = CryptoJS.AES.encrypt(this.text.trim(), this.secretKey).toString();
      this.showSuccess('Text encrypted successfully!');
    } else {
      this.showError('Please enter text to encrypt.');
    }
  }

  // Método para decriptar o texto criptografado usando AES
  decryptText(): void {
    try {
      const bytes = CryptoJS.AES.decrypt(this.text.trim(), this.secretKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedText) {
        this.result = decryptedText;
        this.showSuccess('Text decrypted successfully!');
      } else {
        this.showError('Invalid encrypted text.');
      }
    } catch (e) {
      this.showError('Error decrypting text.');
    }
  }

  // Método para limpar os campos
  clearText(): void {
    this.text = '';
    this.result = '';
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Método para copiar texto para a área de transferência
copyText(textToCopy: string): void {
  if (textToCopy.trim()) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showSuccess('Text copied to clipboard!');
      }, (err) => {
        this.showError('Failed to copy text. Error: ' + err);
      });
    } else {
      this.showError('Clipboard API is not available.');
    }
  } else {
    this.showError('There is no text to copy.');
  }
}

  // Mostrar mensagem de sucesso
  showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    this.clearMessage();
  }

  // Mostrar mensagem de erro
  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    this.clearMessage();
  }

  // Limpar mensagens após alguns segundos
  clearMessage(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
