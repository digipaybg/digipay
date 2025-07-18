export default defineEventHandler(async (event) => {
  const { name, email } = await readBody(event);

  const { sendMail } = useNodeMailer();

  return sendMail({
    to: "raya.lecheva@digipay.bg",
    subject: "Нова регистрация в бюлетин",

    text: `
Име: ${name}
Имейл: ${email}
`,
  });
});
