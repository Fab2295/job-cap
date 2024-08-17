const cds = require('@sap/cds');

class ClimaImpl extends cds.ApplicationService {
  async init() {
    const { ConsultarClima } = this.entities;

    let latitude = -7.939510105314301;
    let longitude = -34.88516563594383;

    const ClimaAPI = await cds.connect.to('API_WEATHER_SERVICE');

    const job = cds.spawn({ every: 180000 }, async (tx) => {
      console.info(`[info] execução iniciada às ${new Date().toISOString()}`);

      console.info(
        `[info] selecionando dados da api com latitude ${latitude} e longitude ${longitude}`
      );

      const response = await ClimaAPI.get(
        `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY_CLIMA}`
      );

      if (response) {
        try {
          console.info(`[info] inserindo dados encontrados na API na tabela`);

          await tx.run(
            INSERT.into(ConsultarClima).entries({
              latitude: latitude,
              longitude: longitude,
              temperatura: response.main.temp,
              temperatura_minina: response.main.temp_min,
              temperatura_maxima: response.main.temp_max,
              umidade: response.main.humidity,
              pressao: response.main.pressure,
              velocidade_vento: response.wind.speed,
            })
          );

          tx.commit();

          console.info(`[info] Dados inseridos com sucesso`);
        } catch (error) {
          tx.rollback();

          console.error(`[error] Dados inseridos com error`);
        }

        console.info(
          `[info] execução terminada às ${new Date().toISOString()}`
        );
      }
    });
  }
}

module.exports = ClimaImpl;
