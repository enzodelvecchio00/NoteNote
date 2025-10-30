const { notaService } = require('../apiService');

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(), 
    delete: jest.fn()
  }))
}));

describe('notaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('obtenerTodas() maneja errores correctamente', async () => {
    const mockError = new Error('Error de red');
    require('axios').create().get.mockRejectedValue(mockError);
    
    await expect(notaService.obtenerTodas()).rejects.toThrow('No se pudieron cargar las notas');
  });
});