export const templates = {
  register: `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a Huellas Unidas!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #0E2524;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #7ECABA;
          padding: 20px;
          text-align: center;
          color: #ffffff;
        }
        .header img {
          max-width: 100px;
          margin-bottom: 10px;
        }
        .header h1 {
          font-size: 24px;
          margin: 0;
        }
        .body {
          padding: 20px;
          line-height: 1.6;
        }
        .body h2 {
          color: #7ECABA;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #D7F0EA;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
          text-align: center;
        }
        .button:hover {
          background-color: #45a049;
        }
        .footer {
          background-color: #f1f1f1;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
        .footer a {
          color: #4CAF50;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://i.imgur.com/kWVT3rP.png" alt="Huellas Unidas">
          <h1>¡Bienvenido a Huellas Unidas, {{name}}!</h1>
        </div>
        <div class="body">
          <h2>Estamos felices de tenerte con nosotros 🐾</h2>
          <p>
            Gracias por unirte a nuestra comunidad. En <strong>Huellas Unidas</strong>, 
            puedes registrar una mascota perdida, reportar un animal encontrado y ayudar 
            a conectar hogares con amigos peludos que lo necesitan.
          </p>
          <p>
            Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. 
            ¡Estamos aquí para ti y para nuestras queridas mascotas! 🐶🐱
          </p>
          <a href="*" class="button">Visita nuestro sitio web</a>
          <p>Gracias por formar parte de nuestra misión. Juntos hacemos la diferencia.</p>
        </div>
        <div class="footer">
          <p>
            Este correo fue enviado automáticamente por <strong>Huellas Unidas</strong>. 
            Si tienes alguna consulta, escríbenos a 
            <a href="mailto:pf3shhuellasunidas@gmail.com">pf3shhuellasunidas@gmail.com</a>.
          </p>
          <p>&copy; 2025 Huellas Unidas. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `,
}