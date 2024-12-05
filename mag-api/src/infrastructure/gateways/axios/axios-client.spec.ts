import { AxiosHttpClient } from '@/infra/gateways'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('post()', () => {
    let url: string
    let data: object

    beforeAll(() => {
      url = 'any_url'
      data = { any: 'any' }
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.post.mockResolvedValue({
        status: 200,
        data: 'any_data',
      })
    })

    it('Should call post with correct values', async () => {
      await sut.post({ url, data })
      expect(fakeAxios.post).toHaveBeenCalledWith(url, data, {
        headers: {},
        httpAgent: {},
      })
      expect(fakeAxios.post).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.post({ url, data })
      expect(result).toEqual('any_data')
    })

    it('should rethrow if post throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.post({ url, data })
      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })

  describe('put()', () => {
    let url: string
    let data: object

    beforeAll(() => {
      url = 'any_url'
      data = { any: 'any' }
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.put.mockResolvedValue({
        status: 200,
        data: 'any_data',
      })
    })

    it('Should call put with correct values', async () => {
      await sut.put({ url, data })
      expect(fakeAxios.put).toHaveBeenCalledWith(url, data, {
        headers: {},
        httpAgent: {},
      })
      expect(fakeAxios.put).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.put({ url, data })
      expect(result).toEqual('any_data')
    })

    it('should rethrow if put throws', async () => {
      fakeAxios.put.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.put({ url, data })
      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })

  describe('delete()', () => {
    let url: string

    beforeAll(() => {
      url = 'any_url'
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.delete.mockResolvedValue({
        status: 200,
        data: 'any_data',
      })
    })

    it('Should call delete with correct values', async () => {
      await sut.delete({ url })
      expect(fakeAxios.delete).toHaveBeenCalledWith(url, {
        headers: {},
        httpAgent: {},
        data: {},
      })
      expect(fakeAxios.delete).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.delete({ url })
      expect(result).toEqual('any_data')
    })

    it('should rethrow if delete throws', async () => {
      fakeAxios.delete.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.delete({ url })
      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })

  describe('get()', () => {
    let url: string
    let params: object

    beforeAll(() => {
      url = 'any_url'
      params = { any: 'any' }
      fakeAxios = axios as jest.Mocked<typeof axios>
      fakeAxios.get.mockResolvedValue({
        status: 200,
        data: 'any_data',
      })
    })

    it('should call get with correct input', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const result = await sut.get({ url, params })
      expect(result).toEqual('any_data')
    })

    it('should rethrow if get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))
      const promise = sut.get({ url, params })
      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
})
