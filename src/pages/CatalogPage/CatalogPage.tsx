import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // обработчик поиска
  const handleSearch = () => {
    if (search.trim()) {
      console.log('Поиск:', search)
      // здесь будет логика поиска
    }
  }

  return (
    <main className={styles.container}>
      {/* поиск */}
      <div className={styles.section}>
        <Input
          type="search"
          placeholder="Искать навык"
          isSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        {search && (
          <p
            style={{
              marginTop: '8px',
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Поиск: {search}
          </p>
        )}
      </div>
      {/* email */}
      <div className={styles.section}>
        <h3 className={styles.label}>Email</h3>
        <Input
          type="email"
          placeholder="Введите email"
          isForm
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* password */}
      <div className={styles.section}>
        <h3 className={styles.label}>Пароль</h3>
        <Input
          type="password"
          placeholder="Придумайте надежный ароль"
          isForm
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.hint}>Пароль должен содержать не менее 8 знаков</p>
      </div>
      {/* рамка error */}
      <div className={styles.section}>
        <h3 className={styles.label}>Ошибка</h3>
        <Input
          type="text"
          placeholder="Пример ошибки"
          error
          errorText="Это поле обязательно для заполнения"
        />
      </div>
      {/* описание */}
      <div className={styles.section}>
        <h3 className={styles.label}>Описание</h3>
        <Input
          multiline
          rows={4}
          placeholder="Коротко опишите, чему можете научить"
          isForm
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </main>
  )
}
