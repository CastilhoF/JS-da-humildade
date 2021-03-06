/*
Number.prototype.toLocaleString()

O método toLocaleString() retorna uma string com uma representação sensível a linguagem deste número.

Os novos argumentos locales e options permitem às aplicações especificar a linguagem cujas convenções de formatações serão utilizadas e personalizar o comportamento da função. 
Nas implementações anteriores, que ignorava os argumentos locales e options arguments, a localização utilizada e a forma de retornar a string eram totalmente dependente da implementação.*/

//Sintaxe

numObj.toLocaleString([locales [ options]])

//Parâmetros

/*Dê uma olhada na seção Compatibilidade do Navegador para verificar quais navegadores suportam os argumentos locales e options, e o Exemplo: 
Verificando o suporte dos argumentos locales e options para detecção desta característica.*/

/* OBS.:

ECMAScript Internationalization API, implementada com o Firefox 29, incluiu o argumento locales ao método Number.toLocaleString(). 
Se o argumento for undefined, este método retorna os dígitos de localização especificados pelo SO, enquanto que as versões anteriores doFirefox retornavam os dígitos Árabe Ocidental. 
Esta mudança foi relatada como uma regressão que afeta a retrocompatibilidade que será corrigida em breve. (bug 999003)*/

/*

locales

Opcional. Uma string com uma tag de linguagem BCP 47 ou uma matriz delas. Para a forma geral e interpretação do argumento locales, veja Intl page. 
A seguinte chave extendida Unicode é permitida:

--nu
O sistema de numeração que será usado. Os valores permitidos são: 
"arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt".

--options
Opcional. Um objeto com alguns ou todas as seguintes propriedades:

--localeMatcher
O algoritmo de comparação de localização para utilizar. Os valores permitidos são "lookup" e "best fit"; o padrão é "best fit". Para mais informações sobre esta opção, veja  Intl page.

--style
O estilo do formato a ser utilizado. Os valores permitidos são "decimal" para formato de número simples, "currency" para formato monetário e "percent" para formato percentual; 
o padrão é "decimal".

--currency
A moeda para usar na formatação monetária. Os valores permitidos são os códigos de moedas da ISO 4217, como "USD" para dólar estadunidense, "EUR" para euro, 
ou "CNY" para RMB chinês — veja a Lista de códigos de moedas e fundos atuais. 
Não há valor padrão; se o style for "currency", a propriedade currency deverá ser informada.

--currencyDisplay
Como será mostrada a moeda na formatação monetária. Os valores permitidos são "symbol" para usar um símbolo de moeda localizado como €, "code" para usar o código de moeda ISO, 
"name" para usar o nome da moeda localizado como "dollar"; o padrão é "symbol".

--useGrouping
Se usar separadores de agrupamento, como separadores de milhares ou milhares/cem mil/dez milhões. Os valores permitidos são true e false; o padrão é true.
As próximas propriedades se dividem em dois grupos: minimumIntegerDigits, minimumFractionDigits, e maximumFractionDigits no primeiro grupo, 
minimumSignificantDigits and maximumSignificantDigits em outro. Se pelo menos uma propriedade do segundo grupo for informado, então o primeiro grupo é ignorado.

--minimumIntegerDigits
A quantidade mínima de dígitos inteiros para utilizar. É possível usar valores de 1 a 21; o padrão é 1.

--minimumFractionDigits
A quantidade mínima de dígitos fracionados para utilizar. É possível usar valores de 0 a 20; o padrão para formatos de números simples e percentuais é 0; 
o padrão para formatos monetários é a menor unidade de dígitos fornecidos pela lista de códigos de moedas ISO 4217 (2 se a lista não fornecer a informação).

--maximumFractionDigits
O número máximo de dígitos fracionados para utilizar. É possível usar valores de 0 a 20; o padrão para a formatação de número simples é o maior entre minimumFractionDigits e 3; 
o padrão para formatos monetários é o maior número de dígitos entre  minimumFractionDigits e o fornecido pela lista de códigos de moedas ISO 4217 (2 se a lista não fornecer a informação); 
o padrão para a formatação percentual é o maior número entre minimumFractionDigits e 0.

--minimumSignificantDigits
A quantidade mínima de dígitos significantes para usar. Os valores permitidos são de 1 a 21; o padrão é 1.

--maximumSignificantDigits
A quantidade máxima de dígitos significantes para usar. Os valores permitidos são de 1 a 21; o padrão é minimumSignificantDigits. */

//EXEMPLOS

/*

Usando toLocaleString

No uso básico sem a especificação de uma localização, o método retornará uma string formatada com a localização e as opções padrão.*/

var numero = 3500;

console.log(numero.toLocaleString()); // Mostra "3,500" se a localização for U.S. English

/*
Verificando o suporte dos argumentos locales e options

Os argumentos locales e options não são suportados por todos os navegadores ainda. Para verificar pelo suporte das implementações do ES5.1 e posteriores, 
a requisição de tags de linguagem ilegais são rejeitadas com uma exceção RangeError pode ser usada da seguinte forma: */

function toLocaleStringSupportsLocales() {
    var numero = 0;
    try {
       numero.toLocaleString('i');
    } catch (e) {
      return e.name === 'RangeError';
    }
    return false;
  }
  

  /*
Antes da ES5.1, implementações que não exigiam um tratamento de erro se toLocaleString fosse chamada com argumentos.

Uma verificação que funciona em todos os casos, incluindo aqueles que suportam ECMA-262 antes da edição 5.1, é
testar pelas especificações de característicadas da ECMA-402 que exigem suporte de opções regionais para Number.prototype.toLocaleString diretamente:*/

function toLocaleStringSupportsOptions() {
    return !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
  }

/*Estes testes para um objeto Intl global, verifica se ele não é null e  se uma propriedade NumberFormat é uma função. 

Usando locales

Este exemplo mostra algumas variações de formatos de números localizados. A fim de obter o formato da linguagem utilizada na interface do usuário da sua aplicação, 
tenha certeza de especificar a língua (e possivelmente algumas línguas reservas) usando o argumento locales:
*/

var numero = 123456.789;

// O alemão usa vírgula como separador de decimal e ponto para milhares
console.log(numero.toLocaleString('de-DE'));
// → 123.456,789

// O árabe usa dígitos Árabes Orientais em muitos países que falam árabe
console.log(numero.toLocaleString('ar-EG'));
// → ١٢٣٤٥٦٫٧٨٩

// A Índia usa separadores de milhares/cem mil/dez milhões
console.log(numero.toLocaleString('en-IN'));
// → 1,23,456.789

// A chave de extensão nu requer um sistema de numeração, ex. decimal chinês
console.log(numero.toLocaleString('zh-Hans-CN-u-nu-hanidec'));
// → 一二三,四五六.七八九

// Quando informada uma língua sem suporte, como balinês,
// inclua uma língua reseva, neste caso indonésio
console.log(numero.toLocaleString(['ban', 'id']));
// → 123.456,789

/*
Usando options

Os resultados obtidos por toLocaleString pode ser personalizado usando o argumento options: */

var numero = 123456.789;

// informando um formato de moeda
console.log(numero.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }));
// → 123.456,79 €

// o yen japonês não tem uma unidade menor
console.log(numero.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }))
// → ￥123,457

// limitando a três dígitos significativos
console.log(numero.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
// → 1,23,000

/*

Desempenho

Quando formatar uma grande quantidade de números, é melhor criar um objeto NumberFormat e usar a função fornecida pela propriedade NumberFormat.format.
 
*/

