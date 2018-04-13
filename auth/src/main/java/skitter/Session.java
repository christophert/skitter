package skitter;

public class Session {
    Account account;
    String sessionId;

    public Account getAccount() {
        return account;
    }
    public String getSessionId() {
        return sessionId;
    }

    public Session(Account account, String sessionId) {
        this.account = account;
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "Session{" +
                "account=" + account +
                ", sessionId='" + sessionId + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Session session = (Session) o;

        if (!account.equals(session.account)) return false;
        return sessionId.equals(session.sessionId);
    }

    @Override
    public int hashCode() {
        int result = account.hashCode();
        result = 31 * result + sessionId.hashCode();
        return result;
    }
}
