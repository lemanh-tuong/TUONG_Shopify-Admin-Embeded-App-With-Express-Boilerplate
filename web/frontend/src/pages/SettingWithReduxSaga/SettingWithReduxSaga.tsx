import { Button } from 'components/Button';
import { Retry } from 'components/Retry/Retry';
import { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeSetting, useGetDefaultSetting, useSaveSetting } from './actions';
import { settingSelector } from './selectors';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả nếu cần 
 */

export const SettingWithReduxSaga = () => {
  const { setting, statusRequest, statusSave } = useSelector(settingSelector);
  const saveSetting = useSaveSetting();
  const getDefaultSetting = useGetDefaultSetting();
  const changeSetting = useChangeSetting();

  const handleChangeMax: ChangeEventHandler<HTMLInputElement> = e => {
    changeSetting({
      data: { max: Number(e.target.value) },
    });
  };

  const handleChangeMin: ChangeEventHandler<HTMLInputElement> = e => {
    changeSetting({
      data: { min: Number(e.target.value) },
    });
  };

  const handleSave: FormEventHandler = e => {
    e.preventDefault();
    saveSetting.request({
      onFailure: confirm,
    });
  };

  useEffect(() => {
    getDefaultSetting.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (statusRequest === 'loading') {
    return <h1>Loading</h1>;
  }

  if (statusRequest === 'failure') {
    return <Retry onClick={() => getDefaultSetting.request(undefined)} />;
  }

  if (!setting) {
    return <h1>Empty</h1>;
  }

  return (
    <h1>
      With Redux Saga
      <form onSubmitCapture={handleSave}>
        <div>
          <label>
            Max: <input onChange={handleChangeMax} type="number" value={setting.max} />
          </label>
        </div>
        <div>
          <label>
            Min: <input onChange={handleChangeMin} type="number" value={setting.min} />
          </label>
        </div>
        <Button type="submit" disabled={statusSave === 'loading'}>
          {statusSave === 'loading' ? 'Saving' : 'Save'}
        </Button>
      </form>
    </h1>
  );
};
