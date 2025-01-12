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
  postCreation: `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Tu Post Fue Creado!</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f1f1f1;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #7ECABA;
        padding: 30px;
        text-align: center;
        color: #ffffff;
      }
      .header img {
        max-width: 80px;
        margin-bottom: 15px;
      }
      .header h1 {
        font-size: 28px;
        margin: 0;
        letter-spacing: 1px;
      }
      .body {
        padding: 25px;
        line-height: 1.7;
        color: #555;
      }
      .body h2 {
        color: #7ECABA;
        font-size: 22px;
      }
      .body p {
        font-size: 16px;
      }
      .button {
        display: inline-block;
        padding: 12px 25px;
        background-color: #D7F0EA;
        color: #fff;
        text-decoration: none;
        border-radius: 8px;
        font-size: 16px;
        margin: 20px 0;
        text-align: center;
      }
      .button:hover {
        background-color: #45a049;
      }
      .footer {
        background-color: #f9f9f9;
        padding: 15px;
        text-align: center;
        font-size: 14px;
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
        <h1>¡Tu Post Fue Creado, {{userName}}!</h1>
      </div>
      <div class="body">
        <h2>¡Gracias por ayudar a nuestras mascotas! 🐾</h2>
        <p>
          Tu post titulado "<strong>{{title}}</strong>" ha sido publicado con éxito. 
          Ahora, más personas pueden ver tu historia y unirse a la causa de encontrar un hogar para nuestros peluditos.
        </p>
        <p>
          Si necesitas editar o eliminar el post, puedes hacerlo desde tu perfil. Gracias por ser parte de la misión de Huellas Unidas.
        </p>
        <a href="#" class="button">Ver tu post</a>
      </div>
      <div class="footer">
        <p>
          Este correo fue enviado automáticamente por <strong>Huellas Unidas</strong>. Si tienes alguna consulta, escríbenos a 
          <a href="mailto:pf3shhuellasunidas@gmail.com">pf3shhuellasunidas@gmail.com</a>.
        </p>
        <p>&copy; 2025 Huellas Unidas. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>
`,
  donationCreation: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Gracias por tu donación!</title>
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
      <h1>¡Gracias por tu donación, {{email}}!</h1>
    </div>
    <div class="body">
      <h2>¡Tu apoyo hace la diferencia! 🐾</h2>
      <p>
        Hemos recibido tu donación de <strong>{{amount}}</strong>. 
        Gracias por apoyar nuestra causa y ayudar a más animales a encontrar un hogar.
      </p>
      <a href="*" class="button">Ver más sobre nuestra misión</a>
      <p>Gracias nuevamente por tu generosidad.</p>
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

  donationSuccess: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tu pago ha sido procesado!</title>
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
      <h1>Tu donación ha sido procesada exitosamente</h1>
    </div>
    <div class="body">
      <h2>Gracias por tu apoyo. 🐾</h2>
    <p>
  ¡Tu pago de <strong>{{amount}} {{currency}},</strong> ha sido exitoso! Gracias por contribuir 
  a nuestra misión de encontrar hogares para los animales en situación de calle.
</p>
      <p>Recibirás más actualizaciones y noticias pronto.</p>
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
petCreation: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tu Mascota Fue Creada!</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f1f1f1;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #7ECABA;
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }
    .header img {
      max-width: 80px;
      margin-bottom: 15px;
    }
    .header h1 {
      font-size: 28px;
      margin: 0;
      letter-spacing: 1px;
    }
    .body {
      padding: 25px;
      line-height: 1.7;
      color: #555;
    }
    .body h2 {
      color: #7ECABA;
      font-size: 22px;
    }
    .body p {
      font-size: 16px;
    }
    .button {
      display: inline-block;
      padding: 12px 25px;
      background-color: #D7F0EA;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      background-color: #45a049;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 15px;
      text-align: center;
      font-size: 14px;
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
      <h1>¡Tu Mascota Fue Creada, {{name}}!</h1>
    </div>
    <div class="body">
      <h2>¡Gracias por ayudar a nuestras mascotas! 🐾</h2>
      <p>
        Has creado con éxito la mascota "<strong>{{name}}</strong>" de la especie "<strong>{{type}}</strong>" y el género "<strong>{{genero}}</strong>". 
        <br>Descripción: <strong>{{description}}</strong>.
      </p>
      <p>
        El estado de la mascota es: <strong>{{status}}</strong>.
      </p>
      <p>
        <img src="{{imgUrl}}" alt="Imagen de la mascota" style="max-width: 100%; height: auto; border-radius: 8px;">
      </p>
      <p>
        Si necesitas editar o eliminar la mascota, puedes hacerlo desde tu perfil. Gracias por ser parte de la misión de Huellas Unidas.
      </p>
      <a href="#" class="button">Ver tu mascota</a>
    </div>
    <div class="footer">
      <p>
        Este correo fue enviado automáticamente por <strong>Huellas Unidas</strong>. Si tienes alguna consulta, escríbenos a 
        <a href="mailto:pf3shhuellasunidas@gmail.com">pf3shhuellasunidas@gmail.com</a>.
      </p>
      <p>&copy; 2025 Huellas Unidas. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
`,
pqrCreation: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de PQR recibido</title>
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
      <h1>Confirmación de PQR recibido</h1>
    </div>
    <div class="body">
      <h2>¡Hola, {{fullname}}! 👋</h2>
      <p>
        Hemos recibido tu solicitud de tipo <strong>{{type}}</strong> con éxito. A continuación te compartimos los detalles:
      </p>
      <ul>
        <li><strong>Nombre completo:</strong> {{fullname}}</li>
        <li><strong>Email:</strong> {{email}}</li>
        <li><strong>Tipo:</strong> {{type}}</li>
        <li><strong>Descripción:</strong> {{description}}</li>
      </ul>
      <p>
        Nuestro equipo está trabajando en ello y te responderá lo antes posible.
      </p>
      <p>Gracias por contactarnos. 🐾</p>
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
`
};
