const p12b64 = '';

var p12Der = forge.util.decode64(p12b64);
// get p12 as ASN.1 object
var p12Asn1 = forge.asn1.fromDer(p12Der);
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'xxxxx');
// const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'Mar250611JJ'); // Mar250611JJ

const bags = p12.getBags({bagType: forge.pki.oids.certBag});
// const cert = bags[forge.pki.oids.certBag][0].cert;

const cert = forge.pki.certificateFromAsn1(bags[forge.pki.oids.certBag][0].asn1);
const certPem = forge.pki.certificateToPem(cert);
console.log(certPem);

const key = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag})[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;
var privateKeyP12Pem = forge.pki.privateKeyToPem(key);

console.log(privateKeyP12Pem);
