import { Button } from 'components/Button';
import { useAuthenticatedFetch } from 'hooks/useAuthenticatedFetch';
import { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả nếu cần 
 */

/**
 * Rất là đần nếu phong cách code là Clean Architech, code được logic nhưng đần về UI/UX vì:
 * - Chỉ hợp với các app có cấu trúc dữ liệu decoupling, app đơn giản
 * - Định nghĩa initialState rồi nhưng type vẫn T | undefined
 * - Request song song -> 2 API update chạy song song và cần hiển thị loading?
 * - Giả dụ với service có rate limit thì không thể tối ưu
 * - Cancel request khá lằng nhằng
 * - Luồng càng rắc rối thì để viết hợp logic càng khó khăn - so sánh với cách thông thuowngf (Save cái này r save cái kia)
 * - Hooks sẽ bị rerun -> 1 chuỗi các hành động làm rerender rất nhiều
 * - Không chạy ngầm những thứ hay ho như analys, record screen, ...
 * ==> Những cái "đần" ở trên có thể chắp vá bằng cách sử dụng các callback "onSuccess", "onFailure", ... 😀😀😀
 * NOTE: Tương tự với "@apollo/client"

 * Ví dụ: CÁC VÍ DỤ BÊN DƯỚI NGHIỆP VỤ ĐẶT HẾT Ở FE để tối ưu chi phí
  - 1 dashboard với mỗi nút Record có nút "Active" và "Deactive" -> Click 3 record liên tục. Tương tự với chức năng DELETE
  - 1 nút click để thực hiện chuỗi action -> GET, DUPLICATE, UPDATE -> Bị rerender do việc lấy GET dữ liệu qua hooks - Không phải lúc nào BE cũng sẽ chịu hết nghiệp vụ. Ví dụ tự dùng service bên 3 (Strapi, Pexel, Unsplash, Migrate dữ liệu để làm đa nền tảng cũng như cạnh tranh) để dựng app
  - Hooks bị unmount -> Không thể chạy ngầm -> Làm app đa nhiệm là không thể. Ví dụ lúc "Tải xuống", "Migrate dữ liệu" hoặc đơn giản là "Tạo bài viết", "Lướt xem bài viết" thì không thể chạy ngầm những thứ khác
  - Đại đa số các service bên 3 giờ sẽ có luồng tạo record như sau: Tạo placeholder -> Trả về id của record đó -> FE sẽ lấy id đó và update -> Thực hiện bằng hooks sẽ khó khăn rất nhiều + performance rerender
  - Đại đa số các service upload bên 3 sẽ có luồng tạo record như sau: Tạo placeholder -> Trả về id của record đó -> Upload media lên 1 bên khác như AWS -> lấy về được url -> Update record đã tạo trước đó -> Thực hiện bằng hooks sẽ khó khăn hơn rất nhiều
  - Khi update 1 item cha cần update 4 item con trước đó -> Rerender tổng 5 lần -> Rerender tốn tài nguyên = chết 
 *  */

const defaultSetting: AppModels.Setting = {
  max: 0,
  min: 0,
  rawData: null,
};
export const SettingWithReactQuery = () => {
  const fetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<AppModels.Setting, Error>({
    refetchInterval: false,
    queryKey: 'setting',
    queryFn: async () => {
      try {
        interface ResponseSuccess {
          data: InternalServices.Setting | null;
        }
        const response = await fetch('/api/setting', { method: 'GET' });
        const json = (await response?.json()) as ResponseSuccess;
        if (json.data) {
          return Promise.resolve({
            max: json.data?.max,
            min: json.data?.min,
            rawData: json.data,
          });
        }
        return defaultSetting;
      } catch (error) {
        // FIXME: Xử lý lỗi để đưa ra message
        return Promise.reject(new Error('Có gì đó sai sai'));
      }
    },
  });
  const { isLoading: isSaving, mutate } = useMutation({
    mutationFn: async (setting: AppModels.Setting) => {
      interface ResponseSuccess {
        data: AppModels.Setting;
      }
      const response = await fetch('/api/setting', {
        method: 'POST',
        body: JSON.stringify({ setting }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = (await response?.json()) as ResponseSuccess;
      return json.data;
    },
    onSuccess: data => {
      queryClient.setQueryData('setting', () => {
        return data;
      });
    },
    onError: () => {
      confirm('Lỗi cmnr');
    },
  });

  const handleChangeMax: ChangeEventHandler<HTMLInputElement> = e => {
    queryClient.setQueryData<AppModels.Setting>('setting', prevState => {
      if (prevState) {
        return {
          ...prevState,
          max: Number(e.target.value),
        };
      }
      return defaultSetting;
    });
  };

  const handleChangeMin: ChangeEventHandler<HTMLInputElement> = e => {
    queryClient.setQueryData<AppModels.Setting>('setting', prevState => {
      if (prevState) {
        return {
          ...prevState,
          min: Number(e.target.value),
        };
      }
      return defaultSetting;
    });
  };

  const handleSave: FormEventHandler = e => {
    e.preventDefault();
    if (data) {
      mutate(data);
    } else {
      confirm('Có gì đó sai sai');
    }
  };

  useEffect(() => {
    if (error) {
      confirm('Có gì đó sai sai');
    }
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <h1>
      With React Query
      <form onSubmitCapture={handleSave}>
        <div>
          <label>
            Max: <input onChange={handleChangeMax} type="number" value={data?.max} />
          </label>
        </div>
        <div>
          <label>
            Min: <input onChange={handleChangeMin} type="number" value={data?.min} />
          </label>
        </div>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving' : 'Save'}
        </Button>
      </form>
    </h1>
  );
};
