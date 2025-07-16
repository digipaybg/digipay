export default defineEventHandler(async (event) => {
  const { name, email, message } = await readBody(event);

  const { sendMail } = useNodeMailer();

  return sendMail({
    to: "raya.lecheva@digipay.bg",
    subject: "Нова заявка от сайта",

    text: `
Име: ${name}
Имейл: ${email}
--------------------------------
Съобщение: ${message}
`,
  });
});
