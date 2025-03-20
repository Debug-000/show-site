package login

import (
	"app/config"
	"app/domain/svc"
	"app/ent"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/GoLabra/labrago/src/api/constants"

	"github.com/golang-jwt/jwt"
)

type LoginFormData struct {
	Email    *string `json:"email"`
	Password *string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var (
		loginFormData LoginFormData
	)

	body, err := io.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": "Invalid request!"},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}
	err = json.Unmarshal(body, &loginFormData)

	service, ok := r.Context().Value(constants.ServiceContextValue).(*svc.Service)
	if !ok {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": svc.ErrServiceNotSetInContext},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}

	user, err := service.User.GetOne(r.Context(), ent.UserWhereUniqueInput{
		Email: loginFormData.Email,
	})

	if err != nil {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": "Unable to fetch user!"},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}

	if user == nil {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": "No user with provided username or email found!"},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write(response)
		return
	}

	role, err := user.Role(r.Context())
	if err != nil || role == nil {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": "User has no role assigned!"},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}

	var token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"exp":  time.Now().Add(24 * time.Hour).Unix(),
		"sub":  user.Email,
		"role": role.Name,
	})

	config, ok := r.Context().Value("config").(*config.Config)

	if !ok {
		response, _ := json.Marshal(map[string][]map[string]string{
			"errors": {
				0: map[string]string{"message": "config is not set in context"},
			},
		})
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(response)
		return
	}

	signedToken, err := token.SignedString([]byte(config.SecretKey))
	if err != nil {
		panic(err)
	}

	response, _ := json.Marshal(map[string]string{
		"token": signedToken,
	})
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
	return
}
